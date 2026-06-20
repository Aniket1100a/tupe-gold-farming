from rest_framework import serializers
from .models import SiteSettings

class SiteSettingsSerializer(serializers.ModelSerializer):
    socialLinks = serializers.SerializerMethodField()
    companyName = serializers.CharField(source='company_name')

    class Meta:
        model = SiteSettings
        fields = ['companyName', 'phone', 'phone2', 'email', 'address', 'whatsapp', 'socialLinks']

    def get_socialLinks(self, obj):
        return {
            'facebook': obj.facebook,
            'twitter': obj.twitter,
            'instagram': obj.instagram,
            'linkedin': obj.linkedin,
        }
