from django.db import models

class Banner(models.Model):
    title_en = models.CharField(max_length=200, blank=True, verbose_name="Title (English)")
    title_mr = models.CharField(max_length=200, blank=True, verbose_name="Title (Marathi)")

    subtitle_en = models.TextField(blank=True, verbose_name="Subtitle (English)")
    subtitle_mr = models.TextField(blank=True, verbose_name="Subtitle (Marathi)")

    image = models.ImageField(upload_to='banners/', null=True, blank=True)

    cta_text_en = models.CharField(max_length=100, blank=True, verbose_name="CTA Text (English)")
    cta_text_mr = models.CharField(max_length=100, blank=True, verbose_name="CTA Text (Marathi)")

    cta_link = models.CharField(max_length=200, blank=True, default='')
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title_en or f"Banner {self.id}"


class BenefitItem(models.Model):
    icon = models.CharField(max_length=50, blank=True, default='Leaf', help_text="Lucide icon name (e.g., 'Leaf', 'Sprout')")

    title_en = models.CharField(max_length=200, blank=True, verbose_name="Title (English)")
    title_mr = models.CharField(max_length=200, blank=True, verbose_name="Title (Marathi)")

    description_en = models.TextField(blank=True, verbose_name="Description (English)")
    description_mr = models.TextField(blank=True, verbose_name="Description (Marathi)")

    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title_en or f"Benefit {self.id}"


class CropResult(models.Model):
    crop_name_en = models.CharField(max_length=100, blank=True, verbose_name="Crop Name (English)")
    crop_name_mr = models.CharField(max_length=100, blank=True, verbose_name="Crop Name (Marathi)")

    yield_increase_percentage = models.CharField(max_length=50, blank=True, default='')

    description_en = models.TextField(blank=True, verbose_name="Description (English)")
    description_mr = models.TextField(blank=True, verbose_name="Description (Marathi)")

    image = models.ImageField(upload_to='crop_results/', null=True, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.crop_name_en or f"Crop Result {self.id}"
