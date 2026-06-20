from rest_framework import serializers
from .models import Banner, BenefitItem, CropResult

class BannerSerializer(serializers.ModelSerializer):
    imageUrl = serializers.SerializerMethodField()

    class Meta:
        model = Banner
        fields = ['id', 'title', 'subtitle', 'imageUrl']

    def get_imageUrl(self, obj):
        request = self.context.get('request')
        if obj.image:
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return None

class BenefitItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = BenefitItem
        fields = ['id', 'icon', 'title', 'description']

class CropResultSerializer(serializers.ModelSerializer):
    cropName = serializers.CharField(source='crop_name')
    yieldIncreasePercentage = serializers.CharField(source='yield_increase_percentage')
    imageUrl = serializers.SerializerMethodField()

    class Meta:
        model = CropResult
        fields = ['id', 'cropName', 'yieldIncreasePercentage', 'description', 'imageUrl']

    def get_imageUrl(self, obj):
        request = self.context.get('request')
        if obj.image:
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return None
