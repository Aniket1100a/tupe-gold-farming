from rest_framework import generics, status
from rest_framework.response import Response
from .models import Banner, BenefitItem, CropResult, Review
from .serializers import (
    BannerSerializer, BenefitItemSerializer, CropResultSerializer, 
    ReviewSerializer, ReviewCreateSerializer
)


class BannerListView(generics.ListAPIView):
    queryset = Banner.objects.filter(is_active=True)
    serializer_class = BannerSerializer


class BenefitItemListView(generics.ListAPIView):
    queryset = BenefitItem.objects.all()
    serializer_class = BenefitItemSerializer


class CropResultListView(generics.ListAPIView):
    queryset = CropResult.objects.filter(is_active=True)
    serializer_class = CropResultSerializer


class ReviewListView(generics.ListAPIView):
    # Returns approved reviews sorted by:
    # 1. Newest submission date (-created_at)
    # 2. Highest rating (-rating)
    serializer_class = ReviewSerializer

    def get_queryset(self):
        return Review.objects.filter(is_approved=True).order_by('-created_at', '-rating')


class ReviewCreateView(generics.CreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewCreateSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            {"message": "Review submitted successfully and is pending approval."},
            status=status.HTTP_201_CREATED,
            headers=headers
        )
