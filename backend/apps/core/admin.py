from django.contrib import admin
from .models import SiteSettings

@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ParametricModelAdmin if hasattr(admin, 'ParametricModelAdmin') else admin.ModelAdmin):
    list_display = ('company_name', 'email', 'phone')

    def has_add_permission(self, request):
        # Only allow one instance
        if self.model.objects.exists():
            return False
        return super().has_add_permission(request)
