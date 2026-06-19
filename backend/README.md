# TupeGoldFarming Backend

This is the backend API for the TupeGoldFarming project, built with Django and Django REST Framework.

## Technologies Used

- **Framework:** [Django 5.2.15](https://www.djangoproject.com/)
- **API Toolkit:** [Django REST Framework (DRF)](https://www.django-rest-framework.org/)
- **Database:** SQLite (Development), PostgreSQL (Production ready)
- **Settings Management:** [python-decouple](https://pypi.org/project/python-decouple/)
- **Image Handling:** [Pillow](https://python-pillow.org/)
- **CORS:** [django-cors-headers](https://github.com/adamchainz/django-cors-headers)

## Project Structure

```text
backend/
├── apps/               # Custom Django applications
│   ├── content/        # Content management (e.g., blog, pages)
│   ├── core/           # Core utilities and base classes
│   └── products/       # Product catalog and management
├── config/             # Project configuration
│   └── settings/       # Settings split by environment (base, dev, prod)
├── manage.py           # Django management script
└── requirements.txt    # Project dependencies
```

## Getting Started

### Prerequisites

- Python 3.10+
- pip (Python package manager)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd tupegoldfarming/backend
   ```

2. **Create and activate a virtual environment:**
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Environment Variables:**
   Create a `.env` file in the `backend/` directory (referencing `python-decouple` usage) if needed for custom secrets.

5. **Run Migrations:**
   ```bash
   python manage.py migrate
   ```

6. **Create a Superuser:**
   ```bash
   python manage.py createsuperuser
   ```

## Running the Server

To start the development server:

```bash
python manage.py runserver --settings=config.settings.dev
```

The API will be available at `http://127.0.0.1:8000/`.

## API Endpoints

- **Admin Interface:** `/admin/`
- **Core API:** `/api/core/`
- **Content API:** `/api/content/`
- **Products API:** `/api/products/`

## Configuration

Settings are modularized in `config/settings/`:
- `base.py`: Shared configurations.
- `dev.py`: Development-specific settings (DEBUG=True, SQLite).
- `prod.py`: Production-specific settings (PostgreSQL, Security headers).

To run with specific settings, use the `--settings` flag or set the `DJANGO_SETTINGS_MODULE` environment variable.
