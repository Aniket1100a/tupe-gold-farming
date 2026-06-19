from django.contrib import admin
from adminsortable2.admin import SortableAdminMixin
from .models import Category, Product, ProductImage

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name_en', 'name_mr', 'slug']
    prepopulated_fields = {'slug': ('name_en',)}

@admin.register(Product)
class ProductAdmin(SortableAdminMixin, admin.ModelAdmin):
    list_display = ['name_en', 'category_name_en', 'is_featured', 'order']
    list_editable = ['is_featured']
    prepopulated_fields = {'slug': ('name_en',)}
    inlines = [ProductImageInline]

    fieldsets = (
        ('Basic Information', {
            'fields': ('name_en', 'name_mr', 'slug', 'category', 'is_featured', 'order')
        }),
        ('Category Display Names', {
            'fields': ('category_name_en', 'category_name_mr'),
            'description': "These names appear as the category label on the product card."
        }),
        ('Descriptions', {
            'fields': (
                'short_description_en', 'short_description_mr',
                'full_description_en', 'full_description_mr'
            )
        }),
        ('Media', {
            'fields': ('image_url',)
        }),
        ('Technical Details (Advanced)', {
            'fields': ('benefits', 'pack_sizes', 'how_to_use', 'crops_targeted'),
            'classes': ('collapse',),
            'description': "Leave these as [] if you don't want to enter JSON. I can simplify these later if needed."
        }),
    )
