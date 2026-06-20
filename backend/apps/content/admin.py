from django.contrib import admin
from adminsortable2.admin import SortableAdminMixin
from .models import Banner, BenefitItem, CropResult

@admin.register(Banner)
class BannerAdmin(SortableAdminMixin, admin.ModelAdmin):
    list_display = ['title', 'is_active', 'order']
    list_editable = ['is_active']
    fields = ('title', 'subtitle', 'image', 'is_active', 'order')

@admin.register(BenefitItem)
class BenefitItemAdmin(SortableAdminMixin, admin.ModelAdmin):
    list_display = ['title', 'icon', 'order']
    fields = ('title', 'description', 'icon', 'order')

@admin.register(CropResult)
class CropResultAdmin(SortableAdminMixin, admin.ModelAdmin):
    list_display = ['crop_name', 'yield_increase_percentage', 'order']
    fields = ('crop_name', 'yield_increase_percentage', 'description', 'image', 'order')
