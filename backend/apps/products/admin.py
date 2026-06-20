from django.contrib import admin
from adminsortable2.admin import SortableAdminMixin, SortableInlineAdminMixin
from .models import Category, Product, ProductImage, BenefitItem, PackSize, TargetedCrop

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1

class BenefitItemInline(SortableInlineAdminMixin, admin.TabularInline):
    model = BenefitItem
    extra = 1

class PackSizeInline(SortableInlineAdminMixin, admin.TabularInline):
    model = PackSize
    extra = 1

class TargetedCropInline(SortableInlineAdminMixin, admin.TabularInline):
    model = TargetedCrop
    extra = 1

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Product)
class ProductAdmin(SortableAdminMixin, admin.ModelAdmin):
    list_display = ['name', 'category_display_name', 'is_featured', 'order']
    list_editable = ['is_featured']
    prepopulated_fields = {'slug': ('name',)}
    inlines = [ProductImageInline, BenefitItemInline, PackSizeInline, TargetedCropInline]

    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'slug', 'category', 'category_display_name', 'is_featured', 'order')
        }),
        ('Descriptions', {
            'fields': ('short_description', 'full_description')
        }),
        ('Media', {
            'fields': ('image_url',)
        }),
        ('Technical Details (Advanced)', {
            'fields': ('how_to_use',),
            'classes': ('collapse',),
        }),
    )
