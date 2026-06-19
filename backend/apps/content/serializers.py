from rest_framework import serializers
from .models import Banner, BenefitItem, CropResult

class BannerSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    subtitle = serializers.SerializerMethodField()
    ctaText = serializers.SerializerMethodField()
    imageUrl = serializers.SerializerMethodField()
    ctaLink = serializers.CharField(source='cta_link')

    class Meta:
        model = Banner
        fields = ['id', 'title', 'subtitle', 'imageUrl', 'ctaText', 'ctaLink']

    def get_title(self, obj):
        return {'en': obj.title_en, 'mr': obj.title_mr}

    def get_subtitle(self, obj):
        return {'en': obj.subtitle_en, 'mr': obj.subtitle_mr}

    def get_ctaText(self, obj):
        return {'en': obj.cta_text_en, 'mr': obj.cta_text_mr}

    def get_imageUrl(self, obj):
        request = self.context.get('request')
        if obj.image:
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return None

class BenefitItemSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()

    class Meta:
        model = BenefitItem
        fields = ['id', 'icon', 'title', 'description']

    def get_title(self, obj):
        return {'en': obj.title_en, 'mr': obj.title_mr}

    def get_description(self, obj):
        return {'en': obj.description_en, 'mr': obj.description_mr}

class CropResultSerializer(serializers.ModelSerializer):
    cropName = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    yieldIncreasePercentage = serializers.CharField(source='yield_increase_percentage')
    imageUrl = serializers.SerializerMethodField()

    class Meta:
        model = CropResult
        fields = ['id', 'cropName', 'yieldIncreasePercentage', 'description', 'imageUrl']

    def get_cropName(self, obj):
        return {'en': obj.crop_name_en, 'mr': obj.crop_name_mr}

    def get_description(self, obj):
        return {'en': obj.description_en, 'mr': obj.description_mr}

    def get_imageUrl(self, obj):
        request = self.context.get('request')
        if obj.image:
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return None
