from rest_framework import serializers
from .models import Banner, BenefitItem, CropResult


class BannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Banner
        fields = '__all__'


class BenefitItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = BenefitItem
        fields = '__all__'


class CropResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = CropResult
        fields = '__all__'