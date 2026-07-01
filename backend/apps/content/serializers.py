from rest_framework import serializers
from .models import Banner, BenefitItem, CropResult, CropResultImage, Review

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

class CropResultImageSerializer(serializers.ModelSerializer):
    imageUrl = serializers.SerializerMethodField()

    class Meta:
        model = CropResultImage
        fields = ['id', 'imageUrl']

    def get_imageUrl(self, obj):
        request = self.context.get('request')
        if obj.image:
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return None

class CropResultSerializer(serializers.ModelSerializer):
    cropName = serializers.CharField(source='crop_name')
    yieldIncreasePercentage = serializers.CharField(source='yield_increase_percentage')
    imageUrl = serializers.SerializerMethodField()
    galleryImages = CropResultImageSerializer(source='images', many=True, read_only=True)

    class Meta:
        model = CropResult
        fields = ['id', 'cropName', 'yieldIncreasePercentage', 'description', 'imageUrl', 'galleryImages']

    def get_imageUrl(self, obj):
        request = self.context.get('request')
        if obj.image:
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return None

class ReviewSerializer(serializers.ModelSerializer):
    imageUrl = serializers.SerializerMethodField()
    farmerType = serializers.CharField(source='farmer_type')

    class Meta:
        model = Review
        fields = ['id', 'name', 'farmerType', 'rating', 'comment', 'imageUrl', 'created_at']
        read_only_fields = ['id', 'created_at', 'imageUrl']

    def get_imageUrl(self, obj):
        request = self.context.get('request')
        if obj.image:
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return None

class ReviewCreateSerializer(serializers.ModelSerializer):
    farmerType = serializers.CharField(source='farmer_type')

    class Meta:
        model = Review
        fields = ['name', 'farmerType', 'rating', 'comment', 'image']
