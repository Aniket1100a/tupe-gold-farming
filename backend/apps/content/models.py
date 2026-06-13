from django.db import models


class Banner(models.Model):
    title = models.CharField(max_length=200, blank=True)
    subtitle = models.CharField(max_length=300, blank=True)
    image = models.ImageField(upload_to='banners/')
    link = models.URLField(blank=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title or f"Banner {self.id}"


class BenefitItem(models.Model):
    icon = models.ImageField(upload_to='benefits/', blank=True, null=True)
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=300, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title


class CropResult(models.Model):
    crop_name = models.CharField(max_length=100)
    result_text = models.CharField(max_length=300)  # e.g. "30-32% higher yield, 3x more tillers"
    before_image = models.ImageField(upload_to='crop_results/', blank=True, null=True)
    after_image = models.ImageField(upload_to='crop_results/', blank=True, null=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.crop_name