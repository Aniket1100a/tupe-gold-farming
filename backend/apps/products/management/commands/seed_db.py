from django.core.management.base import BaseCommand
from apps.core.models import SiteSettings
from apps.content.models import Banner, BenefitItem, CropResult
from apps.products.models import Category, Product, BenefitItem as ProductBenefit, PackSize, TargetedCrop

class Command(BaseCommand):
    help = 'Seeds the database with initial branding and product data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Seeding data...')

        # 1. Site Settings
        SiteSettings.objects.update_or_create(
            pk=1,
            defaults={
                'company_name': 'Tupe Gold Farming',
                'phone': '+91 9527188188',
                'phone2': '+91 9822188188',
                'email': 'info@tupegoldfarming.com',
                'address': '123 Agri Business Park, Green Sector, Agriculture City, 456001',
                'whatsapp': '+91 9527188188',
            }
        )

        # 2. Banners
        Banner.objects.all().delete()
        Banner.objects.create(
            title='Precision Fermented Biofertilizers',
            subtitle='100% Organic certified solutions for sustainable and profitable agriculture.',
            order=1
        )

        # 3. Global Benefits (Home Page)
        BenefitItem.objects.all().delete()
        benefits = [
            ('Leaf', 'Fixes Atmospheric Nitrogen', 'Converts atmospheric nitrogen into forms readily usable by plants.'),
            ('Sprout', 'Improves Root Development', 'Stimulates vigorous root system growth for better nutrient uptake.'),
            ('Sun', 'Enhances Seed Germination', 'Promotes faster and more uniform seedling emergence.'),
        ]
        for icon, title, desc in benefits:
            BenefitItem.objects.create(icon=icon, title=title, description=desc)

        # 4. Crop Results (Success Stories)
        CropResult.objects.all().delete()
        results = [
            ('Sugarcane', '30-32%', 'Dramatic increase in cane girth, weight, and overall sugar recovery.'),
            ('Cotton', '24-26%', 'More bolls per plant and higher boll weight.'),
            ('Wheat', '18-22%', 'Better tillering and fuller grain development.'),
            ('Mango', '22-25%', 'Improved fruit size and color, reduced fruit drop.'),
        ]
        for crop, yield_inc, desc in results:
            CropResult.objects.create(crop_name=crop, yield_increase_percentage=yield_inc, description=desc)

        # 5. Categories
        n_fixer, _ = Category.objects.get_or_create(name='Nitrogen Fixer', slug='nitrogen-fixer')

        # 6. Products
        prod, _ = Product.objects.update_or_create(
            slug='tupegold-azotobacter',
            defaults={
                'name': 'Tupe Gold Azotobacter',
                'category': n_fixer,
                'category_display_name': 'Nitrogen Fixer',
                'short_description': 'Free-living nitrogen-fixing bacteria suitable for all non-leguminous crops.',
                'full_description': 'Tupe Gold Azotobacter is a high-potency biofertilizer based on selective strains of nitrogen-fixing bacteria.',
                'is_featured': True,
                'how_to_use': [
                    {'method': 'Seed Treatment', 'dosage': '10ml per kg', 'instructions': 'Mix well and dry in shade.'},
                    {'method': 'Soil Application', 'dosage': '1-2 Liters per acre', 'instructions': 'Mix with organic manure.'}
                ]
            }
        )
        
        prod.benefits.all().delete()
        prod.pack_sizes.all().delete()
        prod.targeted_crops.all().delete()

        ProductBenefit.objects.create(product=prod, title='Nitrogen Fixing', description='Fixes 20-40 kg N/ha.', icon='leaf')
        ProductBenefit.objects.create(product=prod, title='Growth Promotion', description='Secretes growth hormones.', icon='sprout')

        PackSize.objects.create(product=prod, size='1', unit='Liter')
        PackSize.objects.create(product=prod, size='5', unit='Liters')

        crops = ['Sugarcane', 'Cotton', 'Wheat', 'Mango', 'Banana', 'Tomato', 'Onion']
        for crop_name in crops:
            TargetedCrop.objects.create(product=prod, name=crop_name)

        self.stdout.write(self.style.SUCCESS('Successfully seeded database'))
