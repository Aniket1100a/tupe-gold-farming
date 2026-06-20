from rest_framework import serializers
from .models import SiteSettings

class SiteSettingsSerializer(serializers.ModelSerializer):
    socialLinks = serializers.SerializerMethodField()
    companyName = serializers.CharField(source='company_name')
    logoUrl = serializers.SerializerMethodField()

    class Meta:
        model = SiteSettings
        fields = ['companyName', 'logoUrl', 'phone', 'phone2', 'email', 'address', 'whatsapp', 'socialLinks']

    def get_socialLinks(self, obj):
        return {
            'facebook': obj.facebook,
            'twitter': obj.twitter,
            'instagram': obj.instagram,
            'linkedin': obj.linkedin,
        }

    def get_logoUrl(self, obj):
        request = self.context.get('request')
        if obj.logo:
            return request.build_absolute_uri(obj.logo.url) if request else obj.logo.url
        return None
