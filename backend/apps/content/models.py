from django.db import models

class Banner(models.Model):
    title = models.CharField(max_length=200, blank=True, verbose_name="Title")
    subtitle = models.TextField(blank=True, verbose_name="Subtitle")
    image = models.ImageField(upload_to='banners/', null=True, blank=True)
    cta_text = models.CharField(max_length=100, blank=True, verbose_name="CTA Text")
    cta_link = models.CharField(max_length=200, blank=True, default='')
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title or f"Banner {self.id}"


class BenefitItem(models.Model):
    icon = models.CharField(max_length=50, blank=True, default='Leaf', help_text="Lucide icon name (e.g., 'Leaf', 'Sprout')")
    title = models.CharField(max_length=200, blank=True, verbose_name="Title")
    description = models.TextField(blank=True, verbose_name="Description")
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title or f"Benefit {self.id}"


class CropResult(models.Model):
    crop_name = models.CharField(max_length=100, blank=True, verbose_name="Crop Name")
    yield_increase_percentage = models.CharField(max_length=50, blank=True, default='')
    description = models.TextField(blank=True, verbose_name="Description")
    image = models.ImageField(upload_to='crop_results/', null=True, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.crop_name or f"Crop Result {self.id}"
