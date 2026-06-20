from rest_framework import serializers
from .models import Category, Product, ProductImage, BenefitItem, PackSize, TargetedCrop

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']

class ProductImageSerializer(serializers.ModelSerializer):
    imageUrl = serializers.SerializerMethodField()

    class Meta:
        model = ProductImage
        fields = ['id', 'imageUrl', 'caption', 'order']

    def get_imageUrl(self, obj):
        request = self.context.get('request')
        if obj.image:
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return None

class BenefitItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = BenefitItem
        fields = ['id', 'title', 'description', 'icon']

class PackSizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PackSize
        fields = ['size', 'unit']

class ProductSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='category_display_name', required=False)
    shortDescription = serializers.CharField(source='short_description')
    fullDescription = serializers.CharField(source='full_description')
    imageUrl = serializers.SerializerMethodField(read_only=True)
    benefits = BenefitItemSerializer(many=True, read_only=True)
    packSizes = PackSizeSerializer(source='pack_sizes', many=True, read_only=True)
    howToUse = serializers.JSONField(source='how_to_use', required=False)
    cropsTargeted = serializers.ListField(
        child=serializers.CharField(),
        required=False
    )

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'category', 'shortDescription',
            'fullDescription', 'imageUrl', 'benefits', 'packSizes',
            'howToUse', 'cropsTargeted', 'is_featured'
        ]

    def get_imageUrl(self, obj):
        request = self.context.get('request')
        if obj.image_url:
            return request.build_absolute_uri(obj.image_url.url) if request else obj.image_url.url
        return None

    def to_representation(self, instance):
        """Convert TargetedCrop objects to a list of strings for the frontend."""
        data = super().to_representation(instance)
        data['cropsTargeted'] = [crop.name for crop in instance.targeted_crops.all()]
        return data

    def create(self, validated_data):
        crops_data = validated_data.pop('cropsTargeted', [])
        product = Product.objects.create(**validated_data)
        for crop_name in crops_data:
            TargetedCrop.objects.create(product=product, name=crop_name)
        return product

    def update(self, instance, validated_data):
        crops_data = validated_data.pop('cropsTargeted', None)
        instance = super().update(instance, validated_data)

        if crops_data is not None:
            instance.targeted_crops.all().delete()
            for crop_name in crops_data:
                TargetedCrop.objects.create(product=instance, name=crop_name)

        return instance
