from django.db import models
from django.utils.text import slugify

class Category(models.Model):
    name = models.CharField(max_length=100, blank=True, default='', verbose_name="Name")
    slug = models.SlugField(unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug and self.name:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name or f"Category {self.id}"

    class Meta:
        verbose_name_plural = "Categories"


class Product(models.Model):
    name = models.CharField(max_length=200, blank=True, default='', verbose_name="Name")
    slug = models.SlugField(unique=True, blank=True)

    category_display_name = models.CharField(max_length=100, blank=True, default='', verbose_name="Category Display Name")
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, related_name='products')

    short_description = models.TextField(blank=True, default='', verbose_name="Short Description")
    full_description = models.TextField(blank=True, default='', verbose_name="Full Description")
    
    image_url = models.ImageField(upload_to='products/', null=True, blank=True)

    how_to_use = models.JSONField(default=list, blank=True)

    is_featured = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def save(self, *args, **kwargs):
        if not self.slug:
            if self.name:
                self.slug = slugify(self.name)
            else:
                self.slug = "temp-slug"
        
        is_new = self.pk is None
        super().save(*args, **kwargs)
        
        if is_new or self.slug == "temp-slug":
            if not self.name:
                self.slug = f"product-{self.pk}"
                super().save(update_fields=['slug'])

    def __str__(self):
        return self.name or f"Product {self.id}"


class BenefitItem(models.Model):
    ICON_CHOICES = [
        ('leaf', 'Leaf'),
        ('sprout', 'Sprout'),
        ('sun', 'Sun'),
        ('droplets', 'Droplets'),
        ('shield-check', 'Shield Check'),
        ('trending-up', 'Trending Up'),
        ('package', 'Package'),
    ]
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='benefits')
    title = models.CharField(max_length=200)
    description = models.TextField()
    icon = models.CharField(max_length=50, choices=ICON_CHOICES, default='leaf')
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title


class PackSize(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='pack_sizes')
    size = models.CharField(max_length=50, help_text="e.g. 1, 2.5, 500")
    unit = models.CharField(max_length=50, help_text="e.g. Liter, Kg, Gram")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.size} {self.unit}"


class TargetedCrop(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='targeted_crops')
    name = models.CharField(max_length=100)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name


class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='gallery_images')
    image = models.ImageField(upload_to='products/gallery/', null=True, blank=True)
    caption = models.CharField(max_length=200, blank=True, default='')
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.product.name} - image {self.id}"
