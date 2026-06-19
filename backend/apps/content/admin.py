from django.contrib import admin
from adminsortable2.admin import SortableAdminMixin
from .models import Banner, BenefitItem, CropResult

@admin.register(Banner)
class BannerAdmin(SortableAdminMixin, admin.ModelAdmin):
    list_display = ['title_en', 'is_active', 'order']
    list_editable = ['is_active']
    fieldsets = (
        ('English Content', {
            'fields': ('title_en', 'subtitle_en', 'cta_text_en')
        }),
        ('Marathi Content', {
            'fields': ('title_mr', 'subtitle_mr', 'cta_text_mr')
        }),
        ('Settings', {
            'fields': ('image', 'cta_link', 'is_active', 'order')
        }),
    )

@admin.register(BenefitItem)
class BenefitItemAdmin(SortableAdminMixin, admin.ModelAdmin):
    list_display = ['title_en', 'icon', 'order']
    fieldsets = (
        ('English Content', {
            'fields': ('title_en', 'description_en')
        }),
        ('Marathi Content', {
            'fields': ('title_mr', 'description_mr')
        }),
        ('Settings', {
            'fields': ('icon', 'order')
        }),
    )

@admin.register(CropResult)
class CropResultAdmin(SortableAdminMixin, admin.ModelAdmin):
    list_display = ['crop_name_en', 'yield_increase_percentage', 'order']
    fieldsets = (
        ('English Content', {
            'fields': ('crop_name_en', 'description_en')
        }),
        ('Marathi Content', {
            'fields': ('crop_name_mr', 'description_mr')
        }),
        ('Settings', {
            'fields': ('yield_increase_percentage', 'image', 'order')
        }),
    )
