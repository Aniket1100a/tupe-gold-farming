from rest_framework.response import Response
from rest_framework.views import APIView
from .models import SiteSettings
from .serializers import SiteSettingsSerializer

class SiteSettingsView(APIView):
    def get(self, request):
        settings = SiteSettings.objects.first()
        if not settings:
            # Return empty structure matching the serializer
            return Response({
                "companyName": "TupeGoldFarming",
                "phone": "",
                "phone2": "",
                "email": "",
                "address": {"en": "", "mr": ""},
                "whatsapp": "",
                "socialLinks": {"facebook": "", "twitter": "", "instagram": "", "linkedin": ""}
            })
        serializer = SiteSettingsSerializer(settings)
        return Response(serializer.data)
