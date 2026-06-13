from django.db import models


class SiteSettings(models.Model):
    site_name = models.CharField(max_length=200, default="SVGOLD Biofertilizers")
    logo = models.ImageField(upload_to='core/')
    phone_primary = models.CharField(max_length=20)
    phone_secondary = models.CharField(max_length=20, blank=True)
    email = models.EmailField(blank=True)
    address = models.TextField(blank=True)
    facebook_url = models.URLField(blank=True)
    instagram_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    website_url = models.URLField(blank=True)

    def __str__(self):
        return self.site_name

    def save(self, *args, **kwargs):
        # enforce singleton
        self.pk = 1
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = "Site Settings"
        verbose_name_plural = "Site Settings"