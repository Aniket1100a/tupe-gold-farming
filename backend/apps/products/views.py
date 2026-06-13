from rest_framework import generics
from .models import Product, Category
from .serializers import ProductListSerializer, ProductDetailSerializer, CategorySerializer


class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ProductListView(generics.ListAPIView):
    serializer_class = ProductListSerializer

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
    serializer_class = ProductDetailSerializer
    lookup_field = 'slug'