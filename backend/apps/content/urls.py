from django.urls import path
from .views import (
    BannerListView, BenefitItemListView, CropResultListView,
    ReviewListView, ReviewCreateView
)

urlpatterns = [
    path('banners/', BannerListView.as_view(), name='banners'),
    path('benefits/', BenefitItemListView.as_view(), name='benefits'),
    path('crop-results/', CropResultListView.as_view(), name='crop-results'),
    path('reviews/', ReviewListView.as_view(), name='reviews'),
    path('reviews/create/', ReviewCreateView.as_view(), name='review-create'),
]