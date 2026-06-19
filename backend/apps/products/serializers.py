from rest_framework import serializers
from .models import Category, Product, ProductImage

class CategorySerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']

    def get_name(self, obj):
        return {'en': obj.name_en, 'mr': obj.name_mr}

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
    name = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField()
    shortDescription = serializers.SerializerMethodField()
    fullDescription = serializers.SerializerMethodField()
    imageUrl = serializers.SerializerMethodField()
    packSizes = serializers.JSONField(source='pack_sizes')
    howToUse = serializers.JSONField(source='how_to_use')
    cropsTargeted = serializers.JSONField(source='crops_targeted')
    slug = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'category', 'shortDescription',
            'fullDescription', 'imageUrl', 'benefits', 'packSizes',
            'howToUse', 'cropsTargeted', 'is_featured'
        ]

    def get_slug(self, obj):
        # Fallback to ID if slug is missing
        return obj.slug if obj.slug else str(obj.id)

    def get_name(self, obj):
        return {'en': obj.name_en, 'mr': obj.name_mr}

    def get_category(self, obj):
        return {'en': obj.category_name_en, 'mr': obj.category_name_mr}

    def get_shortDescription(self, obj):
        return {'en': obj.short_description_en, 'mr': obj.short_description_mr}

    def get_fullDescription(self, obj):
        return {'en': obj.full_description_en, 'mr': obj.full_description_mr}

    def get_imageUrl(self, obj):
        request = self.context.get('request')
        if obj.image_url:
            return request.build_absolute_uri(obj.image_url.url) if request else obj.image_url.url
        return None
