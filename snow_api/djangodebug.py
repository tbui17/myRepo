import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'database.settings')
import django
django.setup()


from DataApi.models import Cookie, Header

a1 = Cookie._meta
a2 = Header._meta
a3 = Cookie._meta.fields[4].name

1