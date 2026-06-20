from rest_framework.response import Response
from rest_framework.views import APIView
from drf_spectacular.utils import extend_schema
from .models import SiteSettings
from .serializers import SiteSettingsSerializer

class SiteSettingsView(APIView):
    @extend_schema(responses=SiteSettingsSerializer)
    def get(self, request):
        settings = SiteSettings.objects.first()
        if not settings:
            # Return empty structure matching the serializer
            return Response({
                "companyName": "Tupe Gold Farming",
                "logoUrl": None,
                "phone": "",
                "phone2": "",
                "email": "",
                "address": "",
                "whatsapp": "",
                "socialLinks": {
                    "facebook": "", 
                    "twitter": "", 
                    "instagram": "", 
                    "linkedin": ""
                }
            })
        # Pass request in context so SerializerMethodField can build absolute URI
        serializer = SiteSettingsSerializer(settings, context={'request': request})
        return Response(serializer.data)
