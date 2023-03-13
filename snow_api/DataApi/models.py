from django.db import models
from django.contrib import admin
from django.forms import model_to_dict

# Create your models here.


class AbstractDataModel(models.Model):

    class Meta:
        abstract = True


    def __create_list_display__(self, model):
        self.list_display = [field.name for field in model._meta.fields]
    
    def to_dict(self):
        return model_to_dict(self)
    
    




class Cookie(models.Model):
    name = models.TextField(null=True, blank=True, unique=True)
    value = models.TextField(null=True, blank=True)
    domain = models.TextField(null=True, blank=True)
    domain = models.TextField(null=True, blank=True)
    path = models.TextField(null=True, blank=True)
    expires = models.TextField(null=True, blank=True)
    httpOnly = models.TextField(null=True, blank=True)
    secure = models.TextField(null=True, blank=True)
    sameSite = models.TextField(null=True, blank=True)
    notes = models.TextField(null=True, blank=True)

    


@admin.register(Cookie)
class CookieAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "name",
        "value",
        "domain",
        "path",
        "expires",
        "httpOnly",
        "secure",
        "sameSite",
    )


class Header(models.Model):
    name = models.TextField(null=False, default="head", unique=True)
    value = models.JSONField(null=True, blank=True)


@admin.register(Header)
class HeaderAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "value"]
