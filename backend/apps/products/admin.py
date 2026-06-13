from django.contrib import admin
from adminsortable2.admin import SortableAdminMixin
from .models import Category, Product, ProductImage


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1


@admin.register(Product)
class ProductAdmin(SortableAdminMixin, admin.ModelAdmin):
    list_display = ['name', 'category', 'is_featured', 'order']
    list_filter = ['category', 'is_featured']
    prepopulated_fields = {'slug': ('name',)}
    inlines = [ProductImageInline]