from django.db import models

class SiteSettings(models.Model):
    company_name = models.CharField(max_length=200, default="Tupe Gold Farming")
    logo = models.ImageField(upload_to='core/', blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, default='')
    phone2 = models.CharField(max_length=20, blank=True, default='')
    email = models.EmailField(blank=True, default='')

    address_en = models.TextField(blank=True, verbose_name="Address (English)")
    address_mr = models.TextField(blank=True, verbose_name="Address (Marathi)")

    whatsapp = models.CharField(max_length=20, blank=True, default='')

    # socialLinks
    facebook = models.URLField(blank=True, default='')
    twitter = models.URLField(blank=True, default='')
    instagram = models.URLField(blank=True, default='')
    linkedin = models.URLField(blank=True, default='')

    def __str__(self):
        return self.company_name

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = "Site Settings"
        verbose_name_plural = "Site Settings"
