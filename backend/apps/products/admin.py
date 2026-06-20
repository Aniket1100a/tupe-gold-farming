from django.contrib import admin
from adminsortable2.admin import SortableAdminMixin
from .models import Category, Product, ProductImage

class ProductImageInline(admin.TabularInline):
    model = ProductImage
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
    inlines = [ProductImageInline]

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
            'fields': ('benefits', 'pack_sizes', 'how_to_use', 'crops_targeted'),
            'classes': ('collapse',),
        }),
    )
