from django.contrib import admin
from adminsortable2.admin import SortableAdminMixin, SortableInlineAdminMixin, SortableAdminBase
from .models import SiteSettings, OfficeAddress

class OfficeAddressInline(SortableInlineAdminMixin, admin.StackedInline):
    model = OfficeAddress
    extra = 1

@admin.register(SiteSettings)
class SiteSettingsAdmin(SortableAdminBase, admin.ModelAdmin):
    list_display = ('company_name', 'emails', 'phones')
    inlines = [OfficeAddressInline]

    def has_add_permission(self, request):
        # Only allow one instance
        if self.model.objects.exists():
            return False
        return super().has_add_permission(request)
