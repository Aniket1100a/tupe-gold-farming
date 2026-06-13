from rest_framework import generics
from .models import Banner, BenefitItem, CropResult
from .serializers import BannerSerializer, BenefitItemSerializer, CropResultSerializer


class BannerListView(generics.ListAPIView):
    queryset = Banner.objects.filter(is_active=True)
    serializer_class = BannerSerializer


class BenefitItemListView(generics.ListAPIView):
    queryset = BenefitItem.objects.all()
    serializer_class = BenefitItemSerializer


class CropResultListView(generics.ListAPIView):
    queryset = CropResult.objects.all()
    serializer_class = CropResultSerializer