from django.urls import path
from .views import BannerListView, BenefitItemListView, CropResultListView

urlpatterns = [
    path('banners/', BannerListView.as_view(), name='banners'),
    path('benefits/', BenefitItemListView.as_view(), name='benefits'),
    path('crop-results/', CropResultListView.as_view(), name='crop-results'),
]