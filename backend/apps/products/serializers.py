from rest_framework import serializers
from .models import Category, Product, ProductImage

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

class ProductSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='category_display_name')
    shortDescription = serializers.CharField(source='short_description')
    fullDescription = serializers.CharField(source='full_description')
    imageUrl = serializers.SerializerMethodField()
    packSizes = serializers.JSONField(source='pack_sizes')
    howToUse = serializers.JSONField(source='how_to_use')
    cropsTargeted = serializers.JSONField(source='crops_targeted')

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
