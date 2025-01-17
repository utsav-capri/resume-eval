from django.contrib import admin
from .models import User
from .models import Job
from .models import Application
# Register your models here.
admin.site.register(User)
admin.site.register(Job)
admin.site.register(Application)