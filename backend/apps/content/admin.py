from django.contrib import admin
from adminsortable2.admin import SortableAdminMixin
from .models import Banner, BenefitItem, CropResult


@admin.register(Banner)
class BannerAdmin(SortableAdminMixin, admin.ModelAdmin):
    list_display = ['title', 'is_active', 'order']
    list_editable = ['is_active']


@admin.register(BenefitItem)
class BenefitItemAdmin(SortableAdminMixin, admin.ModelAdmin):
    list_display = ['title', 'order']


@admin.register(CropResult)
class CropResultAdmin(SortableAdminMixin, admin.ModelAdmin):
    list_display = ['crop_name', 'result_text', 'order']