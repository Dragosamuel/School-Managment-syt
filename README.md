# Drago Samuel Jared - Portfolio Website

A modern, responsive portfolio website built with Django and Bootstrap 5.

## Features

- Modern and responsive design
- Project showcase with images and links
- Skills section with proficiency indicators
- Education timeline
- Contact information with social media links
- Admin interface for easy content management

## Requirements

- Python 3.8+
- Django 5.0+
- Pillow (for image handling)
- Other dependencies listed in requirements.txt

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio-website
```

2. Create a virtual environment and activate it:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run migrations:
```bash
python manage.py migrate
```

5. Create a superuser for admin access:
```bash
python manage.py createsuperuser
```

6. Run the development server:
```bash
python manage.py runserver
```

## Usage

1. Access the admin interface at `http://localhost:8000/admin/`
2. Log in with your superuser credentials
3. Add your projects, skills, education, and contact information
4. View your portfolio at `http://localhost:8000/`

## Customization

- Modify the templates in `portfolio/templates/portfolio/` to change the look and feel
- Update the CSS in `base.html` to change colors and styling
- Add or modify models in `models.py` to include additional information

## Contributing

Feel free to submit issues and enhancement requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 