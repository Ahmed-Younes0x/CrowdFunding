from django.contrib import admin
from .models import Project,Category,ProjectImage,ProjectTag

admin.site.register([Project,Category,ProjectImage,ProjectTag] )