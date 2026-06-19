from django.db import models
from django.utils.text import slugify

class Category(models.Model):
    name_en = models.CharField(max_length=100, blank=True, default='', verbose_name="Name (English)")
    name_mr = models.CharField(max_length=100, blank=True, default='', verbose_name="Name (Marathi)")
    slug = models.SlugField(unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug and self.name_en:
            self.slug = slugify(self.name_en)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name_en or f"Category {self.id}"

    class Meta:
        verbose_name_plural = "Categories"


class Product(models.Model):
    name_en = models.CharField(max_length=200, blank=True, default='', verbose_name="Name (English)")
    name_mr = models.CharField(max_length=200, blank=True, default='', verbose_name="Name (Marathi)")
    slug = models.SlugField(unique=True, blank=True)
    
    category_name_en = models.CharField(max_length=100, blank=True, default='', verbose_name="Category Display Name (English)")
    category_name_mr = models.CharField(max_length=100, blank=True, default='', verbose_name="Category Display Name (Marathi)")
    
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, related_name='products')
    
    short_description_en = models.TextField(blank=True, default='', verbose_name="Short Description (English)")
    short_description_mr = models.TextField(blank=True, default='', verbose_name="Short Description (Marathi)")
    
    full_description_en = models.TextField(blank=True, default='', verbose_name="Full Description (English)")
    full_description_mr = models.TextField(blank=True, default='', verbose_name="Full Description (Marathi)")
    
    image_url = models.ImageField(upload_to='products/', null=True, blank=True)
    benefits = models.JSONField(default=list, blank=True)
    pack_sizes = models.JSONField(default=list, blank=True)
    how_to_use = models.JSONField(default=list, blank=True)
    crops_targeted = models.JSONField(default=list, blank=True)
    
    is_featured = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def save(self, *args, **kwargs):
        # 1. Create a slug if missing
        if not self.slug:
            if self.name_en:
                self.slug = slugify(self.name_en)
            else:
                self.slug = "temp-slug"
        
        # 2. Save first to get an ID if it's new
        is_new = self.pk is None
        super().save(*args, **kwargs)
        
        # 3. If it was new or had a temp slug, update it to use the ID
        if is_new or self.slug == "temp-slug":
            if not self.name_en:
                self.slug = f"product-{self.pk}"
                super().save(update_fields=['slug'])

    def __str__(self):
        return self.name_en or f"Product {self.id}"


class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='gallery_images')
    image = models.ImageField(upload_to='products/gallery/', null=True, blank=True)
    caption = models.CharField(max_length=200, blank=True, default='')
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.product.name_en} - image {self.id}"
