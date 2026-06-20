# Tupe Gold Farming API Documentation

This document provides detailed information about the API endpoints available in the Tupe Gold Farming backend.

## Base URL
The API is accessible at: `http://127.0.0.1:8000/` (Local Development)

## Interactive Documentation
We use Swagger and Redoc for interactive API testing and detailed schema viewing.
- **Swagger UI:** [/api/docs/](http://127.0.0.1:8000/api/docs/)
- **Redoc:** [/api/redoc/](http://127.0.0.1:8000/api/redoc/)

---

## 1. Core API (`/api/core/`)

### Get Site Settings
Returns the global configuration for the website, including contact details and social media links.

- **Endpoint:** `GET /api/core/site-settings/`
- **Response Example:**
```json
{
  "companyName": "Tupe Gold Farming",
  "phone": "+91 9527188188",
  "phone2": "+91 9822188188",
  "email": "info@tupegoldfarming.com",
  "address": "123 Agri Business Park, Green Sector, Agriculture City, 456001",
  "whatsapp": "+91 9527188188",
  "socialLinks": {
    "facebook": "https://facebook.com/...",
    "twitter": "",
    "instagram": "",
    "linkedin": ""
  }
}
```

---

## 2. Content API (`/api/content/`)

### Get Banners
Returns a list of active hero banners for the home page.

- **Endpoint:** `GET /api/content/banners/`
- **Response Fields:** `id`, `title`, `subtitle`, `imageUrl`, `ctaText`, `ctaLink`

### Get Benefits
Returns the "Why Choose Us" benefit items.

- **Endpoint:** `GET /api/content/benefits/`
- **Response Fields:** `id`, `icon` (Lucide name), `title`, `description`

### Get Crop Results
Returns the success stories and yield increase data.

- **Endpoint:** `GET /api/content/crop-results/`
- **Response Fields:** `id`, `cropName`, `yieldIncreasePercentage`, `description`, `imageUrl`

---

## 3. Products API (`/api/products/`)

### List Categories
Returns all product categories (e.g., Nitrogen Fixers, Potash Mobilizers).

- **Endpoint:** `GET /api/products/categories/`

### List Products
Returns a list of products. Supports filtering.

- **Endpoint:** `GET /api/products/`
- **Query Parameters:**
  - `featured`: Set to `true` to get only featured products.
  - `category`: Filter by category slug (e.g., `?category=nitrogen-fixer`).
- **Response Fields:** `id`, `name`, `slug`, `category` (display name), `shortDescription`, `imageUrl`, `is_featured`.

### Product Detail
Returns full technical details for a specific product.

- **Endpoint:** `GET /api/products/<slug_or_id>/`
- **Example:** `/api/products/tupe-gold-azotobacter/`
- **Detailed Fields:**
  - `fullDescription`: Detailed product info.
  - `benefits`: JSON array of specific product benefits.
  - `packSizes`: JSON array of available sizes (e.g., `[{"size": "1", "unit": "Liter"}]`).
  - `howToUse`: JSON array of application methods and dosages.
  - `cropsTargeted`: List of crops this product is best for.

---

## Data Format
All API responses are in **JSON** format.
Standard successful responses return a `200 OK` status.
Errors return standard HTTP status codes (e.g., `404 Not Found`).
