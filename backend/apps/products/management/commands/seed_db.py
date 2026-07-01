from django.core.management.base import BaseCommand
from apps.core.models import SiteSettings, OfficeAddress
from apps.content.models import Banner, BenefitItem, CropResult, Review
from apps.products.models import Category, Product, BenefitItem as ProductBenefit, PackSize, TargetedCrop

class Command(BaseCommand):
    help = 'Seeds the database with initial branding and product data safely (only updates empty fields)'

    def add_arguments(self, parser):
        parser.add_argument(
            '--clear',
            action='store_true',
            help='Clear all data instead of seeding',
        )

    def handle(self, *args, **kwargs):
        if kwargs['clear']:
            self.stdout.write('Clearing all data...')
            Banner.objects.all().delete()
            BenefitItem.objects.all().delete()
            CropResult.objects.all().delete()
            Category.objects.all().delete()
            Product.objects.all().delete()
            Review.objects.all().delete()
            OfficeAddress.objects.all().delete()
            self.stdout.write(self.style.SUCCESS('Successfully cleared all data'))
            return

        self.stdout.write('Seeding data safely...')

        # 1. Site Settings
        settings, created = SiteSettings.objects.get_or_create(pk=1)
        settings_defaults = {
            'company_name': 'Tupe Gold Farming',
            'phones': '+91 9822188188, +91 7218188189, +91 8975188188',
            'emails': 'officetupegoldfarming@gmail.com, tupegoldfarming@gmail.com',
            'whatsapp': '+91 9822188188',
        }
        updated = False
        for key, value in settings_defaults.items():
            if not getattr(settings, key, None):
                setattr(settings, key, value)
                updated = True
        if updated or created:
            settings.save()

        # 1.1 Office Addresses
        addresses_data = [
            {
                'title': 'Main Office',
                'address': 'S NO 230 H NO 3A 5A, H N 3 & 23 NALBAND MARKET, Pune City, Pune, Maharashtra, 411028',
                'order': 1
            },
            {
                'title': 'Office',
                'address': 'Kanchan Junga S.No.153A/1A/1, Magarpatta Road, Hadapsar',
                'order': 2
            }
        ]
        for addr in addresses_data:
            OfficeAddress.objects.get_or_create(title=addr['title'], settings=settings, defaults={'address': addr['address'], 'order': addr['order']})

        # 2. Banners
        banners_data = [
            {
                'title': 'Precision Fermented Biofertilizers',
                'subtitle': '100% Organic certified solutions for sustainable and profitable agriculture.',
                'order': 1
            }
        ]
        for b_data in banners_data:
            banner, b_created = Banner.objects.get_or_create(title=b_data['title'], defaults=b_data)
            if not b_created:
                if not banner.subtitle:
                    banner.subtitle = b_data['subtitle']
                    banner.save()

        # 3. Global Benefits
        benefits = [
            ('leaf', 'Fixes Atmospheric Nitrogen', 'Converts atmospheric nitrogen into forms readily usable by plants.'),
            ('sprout', 'Improves Root Development', 'Stimulates vigorous root system growth for better nutrient uptake.'),
            ('sun', 'Enhances Seed Germination', 'Promotes faster and more uniform seedling emergence.'),
        ]
        for icon, title, desc in benefits:
            benefit, ben_created = BenefitItem.objects.get_or_create(title=title, defaults={'icon': icon, 'description': desc})
            if not ben_created:
                if not benefit.description:
                    benefit.description = desc
                    benefit.save()
                if not benefit.icon:
                    benefit.icon = icon
                    benefit.save()

        # 4. Crop Results
        results = [
            ('Sugarcane', '30-32%', 'Dramatic increase in cane girth, weight, and overall sugar recovery.'),
            ('Cotton', '24-26%', 'More bolls per plant and higher boll weight.'),
            ('Wheat', '18-22%', 'Better tillering and fuller grain development.'),
            ('Mango', '22-25%', 'Improved fruit size and color, reduced fruit drop.'),
        ]
        for crop, yield_inc, desc in results:
            cr, cr_created = CropResult.objects.get_or_create(crop_name=crop, defaults={'yield_increase_percentage': yield_inc, 'description': desc})
            if not cr_created:
                if not cr.description:
                    cr.description = desc
                    cr.save()
                if not cr.yield_increase_percentage:
                    cr.yield_increase_percentage = yield_inc
                    cr.save()

        # 5. Categories
        bio_cat, _ = Category.objects.get_or_create(name='Biofertilizer', slug='biofertilizer')
        npk_cat, _ = Category.objects.get_or_create(name='NPK Consortia', slug='npk-consortia')

        # 6. Products
        products_to_seed = [
            {
                'name': 'SVGOLD AZOTOBACTER Liquid Biofertilizer',
                'slug': 'svgold-azotobacter-liquid',
                'category': bio_cat,
                'category_display_name': 'LIQUID BIOFERTILIZER',
                'short_description': 'A free-living nitrogen-fixing bacteria that captures nitrogen from the air and makes it available to plants.',
                'full_description': 'A free-living nitrogen-fixing bacteria that captures nitrogen from the air and makes it available to plants. Supports stronger root growth, healthier seedlings, and greener leaves.',
                'is_featured': True,
                'how_to_use': [
                    {'method': 'SOIL APPLICATION', 'dosage': '5L in 200L water or 500ml in 15L spray pump', 'instructions': 'Apply to 1 acre of land through drip irrigation or by drenching the soil at the roots.'},
                    {'method': 'SEED TREATMENT', 'dosage': '500ml', 'instructions': 'Add to the seeds. Mix thoroughly to let the product coat the seeds evenly. Dry the coated seeds in shade for 20-25min. before sowing.'},
                    {'method': 'ROOT DIpping', 'dosage': '500ml in 500ml water', 'instructions': 'Dip the roots of seedlings for up to 30min. before transplantation.'}
                ],
                'benefits': [
                    ('Fixes atmospheric nitrogen into soil', 'Captures nitrogen from the air and makes it available to plants.', 'leaf'),
                    ('Improves root development', 'Supports stronger root growth and healthier seedlings.', 'sprout'),
                    ('Enhances seed germination & early growth', 'Promotes greener leaves and early plant vigour.', 'sun'),
                    ('Improves soil health & fertility', 'Naturally enriches the soil ecosystem.', 'droplets'),
                    ('Reduces chemical fertilizer use', 'Sustainable alternative to synthetic fertilizers.', 'shield-check'),
                ],
                'pack_sizes': [
                    ('100', 'ml', 150.00),
                    ('1', 'Litre', 850.00),
                    ('5', 'Litres', 3800.00),
                    ('20', 'liter', 14000.00)
                ],
                'crops': ['Sugarcane', 'Wheat', 'Maize', 'Vegetables']
            },
            {
                'name': 'SVGOLD PLUS (NPK Consortia)',
                'slug': 'svgold-plus-npk-consortia',
                'category': npk_cat,
                'category_display_name': 'NPK CONSORTIA',
                'short_description': 'A natural biofertilizer providing essential Nitrogen, Phosphorus, and Potassium.',
                'full_description': 'SV Gold Plus is an NPK Consortia biofertilizer, a natural fertilizer made from living microorganisms that provides essential nutrients (Nitrogen, Phosphorus, and Potassium) to crops. It has a high CFU count (1 x 10^8) ensuring consistent results. Government Green Cert certified.',
                'is_featured': True,
                'how_to_use': [
                    {'method': 'SUGAR CANE', 'dosage': '1-2 L/acre', 'instructions': 'Can be applied via drip, drenching, or spray.'},
                    {'method': 'FRUIT ORCHARDS', 'dosage': '1-1.5 L/acre', 'instructions': 'Can be applied via drip, drenching, or spray.'},
                    {'method': 'VEGETABLES', 'dosage': '1 L/acre', 'instructions': 'Can be applied via drip, drenching, or spray.'}
                ],
                'benefits': [
                    ('Improves soil fertility', 'Enhances nutrient availability in the soil.', 'leaf'),
                    ('Enhances plant growth', 'Provides essential NPK for balanced growth.', 'sprout'),
                    ('Maintains organic carbon and pH levels', 'Supports a healthy soil environment.', 'sun'),
                    ('Reduces chemical fertilizer costs', 'Economical and organic solution.', 'trending-up'),
                    ('Improves long-term soil health', 'Ensures sustainable land productivity.', 'shield-check'),
                ],
                'pack_sizes': [
                    ('100', 'ml', 180.00),
                    ('1', 'Litre', 950.00)
                ],
                'crops': ['Sugarcane', 'Fruit Crops', 'Vegetables', 'Cotton', 'Soybean']
            }
        ]

        for p_data in products_to_seed:
            benefits_list = p_data.pop('benefits')
            pack_sizes_list = p_data.pop('pack_sizes')
            crops_list = p_data.pop('crops')

            product, p_created = Product.objects.get_or_create(slug=p_data['slug'], defaults=p_data)

            if not p_created:
                # Update empty fields only
                p_updated = False
                for field in ['name', 'short_description', 'full_description', 'category_display_name']:
                    if not getattr(product, field, None):
                        setattr(product, field, p_data[field])
                        p_updated = True
                if not product.how_to_use:
                    product.how_to_use = p_data['how_to_use']
                    p_updated = True
                if p_updated:
                    product.save()

            # Seed child models if they don't exist
            for title, desc, icon in benefits_list:
                ProductBenefit.objects.get_or_create(product=product, title=title, defaults={'description': desc, 'icon': icon})

            for size, unit, price in pack_sizes_list:
                ps, ps_created = PackSize.objects.get_or_create(product=product, size=size, unit=unit, defaults={'price': price})
                if not ps_created and not ps.price:
                    ps.price = price
                    ps.save()

            for crop_name in crops_list:
                TargetedCrop.objects.get_or_create(product=product, name=crop_name)

        # 7. Reviews
        reviews_data = [
            ('Ramesh Jadhav', 'Sugarcane Farmer', 5, 'Since using Tupe Gold Farming biofertilizers, my sugarcane yield has increased by almost 30%.'),
            ('Suresh Patil', 'Wheat Farmer', 5, 'I was skeptical about organic farming, but the Azotobacter plus transformed my wheat fields.'),
            ('Anil Gaikwad', 'Cotton Farmer', 5, 'Excellent results on my cotton crop. The plants are healthier and greener.'),
        ]
        for name, f_type, rating, comment in reviews_data:
            Review.objects.get_or_create(
                name=name,
                farmer_type=f_type,
                defaults={'rating': rating, 'comment': comment, 'is_approved': True}
            )

        self.stdout.write(self.style.SUCCESS('Successfully seeded database safely (no data was overwritten)'))
