from django.contrib import admin
from adminsortable2.admin import SortableAdminMixin, SortableInlineAdminMixin
from .models import Banner, BenefitItem, CropResult, CropResultImage, Review

@admin.register(Banner)
class BannerAdmin(SortableAdminMixin, admin.ModelAdmin):
    list_display = ['title', 'is_active', 'order']
    list_editable = ['is_active']
    fields = ('title', 'subtitle', 'image', 'is_active', 'order')

@admin.register(BenefitItem)
class BenefitItemAdmin(SortableAdminMixin, admin.ModelAdmin):
    list_display = ['title', 'icon', 'order']
    fields = ('title', 'description', 'icon', 'order')

class CropResultImageInline(SortableInlineAdminMixin, admin.TabularInline):
    model = CropResultImage
    extra = 1

@admin.register(CropResult)
class CropResultAdmin(SortableAdminMixin, admin.ModelAdmin):
    list_display = ['crop_name', 'yield_increase_percentage', 'is_active', 'order']
    list_editable = ['is_active']
    fields = ('crop_name', 'yield_increase_percentage', 'description', 'image', 'is_active', 'order')
    inlines = [CropResultImageInline]

@admin.register(Review)
class ReviewAdmin(SortableAdminMixin, admin.ModelAdmin):
    list_display = ['name', 'farmer_type', 'rating', 'is_approved', 'order', 'created_at']
    list_editable = ['is_approved']
    list_filter = ['is_approved', 'rating']
    search_fields = ['name', 'farmer_type', 'comment']
    fields = ('name', 'farmer_type', 'rating', 'comment', 'image', 'is_approved', 'order')
