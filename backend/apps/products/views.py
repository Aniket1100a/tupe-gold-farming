from rest_framework import generics
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer
from django.db.models import Q
from rest_framework.exceptions import NotFound

class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.all()
        category_slug = self.request.query_params.get('category')
        featured = self.request.query_params.get('featured')
        
        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)
        
        if featured == 'true':
            queryset = queryset.filter(is_featured=True)
            
        return queryset

class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
    def get_object(self):
        # The 'slug' from the URL could be an actual slug OR a numeric ID
        lookup = self.kwargs.get("slug")

        if not lookup:
            raise NotFound("No lookup parameter provided.")

        # 1. Try finding by Slug exactly
        product = Product.objects.filter(slug=lookup).first()
        if product:
            return product

        # 2. Try finding by ID if the lookup is a number
        if lookup.isdigit():
            product = Product.objects.filter(id=int(lookup)).first()
            if product:
                return product

        # 3. Last resort: Try case-insensitive slug or a slug-friendly version of the name
        product = Product.objects.filter(
            Q(slug__iexact=lookup) |
            Q(name_en__iexact=lookup.replace('-', ' '))
        ).first()

        if product:
            return product

        # If absolutely nothing matches
        raise NotFound(f"No Product matches the identifier: {lookup}")
