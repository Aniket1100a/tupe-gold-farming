from django.core.management.base import BaseCommand
from apps.core.models import SiteSettings
from apps.content.models import Banner, BenefitItem, CropResult
from apps.products.models import Category, Product, BenefitItem as ProductBenefit, PackSize, TargetedCrop

class Command(BaseCommand):
    help = 'Seeds the database with initial branding and product data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Seeding data...')

        # 1. Site Settings (Reverted to original values)
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

        # 2. Banners (Original)
        Banner.objects.all().delete()
        Banner.objects.create(
            title='Precision Fermented Biofertilizers',
            subtitle='100% Organic certified solutions for sustainable and profitable agriculture.',
            order=1
        )

        # 3. Global Benefits (Original icons/titles)
        BenefitItem.objects.all().delete()
        benefits = [
            ('Leaf', 'Fixes Atmospheric Nitrogen', 'Converts atmospheric nitrogen into forms readily usable by plants.'),
            ('Sprout', 'Improves Root Development', 'Stimulates vigorous root system growth for better nutrient uptake.'),
            ('Sun', 'Enhances Seed Germination', 'Promotes faster and more uniform seedling emergence.'),
        ]
        for icon, title, desc in benefits:
            BenefitItem.objects.create(icon=icon, title=title, description=desc)

        # 4. Crop Results (Original)
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
        bio_cat, _ = Category.objects.get_or_create(name='Biofertilizer', slug='biofertilizer')
        npk_cat, _ = Category.objects.get_or_create(name='NPK Consortia', slug='npk-consortia')

        # 6. Products
        Product.objects.all().delete()

        # Product 1: SVGOLD AZOTOBACTER
        azoto = Product.objects.create(
            name='SVGOLD AZOTOBACTER Liquid Biofertilizer',
            slug='svgold-azotobacter-liquid',
            category=bio_cat,
            category_display_name='Liquid Biofertilizer',
            short_description='A free-living nitrogen-fixing bacteria that captures nitrogen from the air and makes it available to plants.',
            full_description='A free-living nitrogen-fixing bacteria that captures nitrogen from the air and makes it available to plants. Supports stronger root growth, healthier seedlings, and greener leaves.',
            is_featured=True,
            how_to_use=[
                {
                    'method': 'Soil Application',
                    'dosage': '5L in 200L water or 500ml in 15L spray pump',
                    'instructions': 'Apply to 1 acre of land through drip irrigation or by drenching the soil at the roots.'
                },
                {
                    'method': 'Seed Treatment',
                    'dosage': '500ml',
                    'instructions': 'Add to the seeds. Mix thoroughly to let the product coat the seeds evenly. Dry the coated seeds in shade for 20-25min. before sowing.'
                },
                {
                    'method': 'Root Dipping',
                    'dosage': '500ml in 500ml water',
                    'instructions': 'Dip the roots of seedlings for up to 30min. before transplantation.'
                }
            ]
        )
        
        azoto_benefits = [
            ('Fixes atmospheric nitrogen into soil', 'Captures nitrogen from the air and makes it available to plants.', 'leaf'),
            ('Improves root development', 'Supports stronger root growth and healthier seedlings.', 'sprout'),
            ('Enhances seed germination & early growth', 'Promotes greener leaves and early plant vigour.', 'sun'),
            ('Improves soil health & fertility', 'Naturally enriches the soil ecosystem.', 'droplets'),
            ('Reduces chemical fertilizer use', 'Sustainable alternative to synthetic fertilizers.', 'shield-check'),
        ]
        for title, desc, icon in azoto_benefits:
            ProductBenefit.objects.create(product=azoto, title=title, description=desc, icon=icon)

        for size, unit in [('100', 'ml'), ('1', 'Litre'), ('5', 'Litres'), ('20', 'liter')]:
            PackSize.objects.create(product=azoto, size=size, unit=unit)

        # Product 2: SVGOLD PLUS
        plus = Product.objects.create(
            name='SVGOLD PLUS (NPK Consortia)',
            slug='svgold-plus-npk-consortia',
            category=npk_cat,
            category_display_name='NPK Consortia',
            short_description='A natural biofertilizer providing essential Nitrogen, Phosphorus, and Potassium.',
            full_description='SV Gold Plus is an NPK Consortia biofertilizer, a natural fertilizer made from living microorganisms that provides essential nutrients (Nitrogen, Phosphorus, and Potassium) to crops. It has a high CFU count (1 x 10^8) ensuring consistent results. Government Green Cert certified.',
            is_featured=True,
            how_to_use=[
                {'method': 'Sugar cane', 'dosage': '1-2 L/acre', 'instructions': 'Can be applied via drip, drenching, or spray.'},
                {'method': 'Fruit orchards', 'dosage': '1-1.5 L/acre', 'instructions': 'Can be applied via drip, drenching, or spray.'},
                {'method': 'Vegetables', 'dosage': '1 L/acre', 'instructions': 'Can be applied via drip, drenching, or spray.'}
            ]
        )

        plus_benefits = [
            ('Improves soil fertility', 'Enhances nutrient availability in the soil.', 'leaf'),
            ('Enhances plant growth', 'Provides essential NPK for balanced growth.', 'sprout'),
            ('Maintains organic carbon and pH levels', 'Supports a healthy soil environment.', 'sun'),
            ('Reduces chemical fertilizer costs', 'Economical and organic solution.', 'trending-up'),
            ('Improves long-term soil health', 'Ensures sustainable land productivity.', 'shield-check'),
        ]
        for title, desc, icon in plus_benefits:
            ProductBenefit.objects.create(product=plus, title=title, description=desc, icon=icon)

        for size, unit in [('100', 'ml'), ('1', 'Litre')]:
            PackSize.objects.create(product=plus, size=size, unit=unit)

        self.stdout.write(self.style.SUCCESS('Successfully seeded database with requested products'))
