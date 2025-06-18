"""
URL configuration for Crowd_Funding project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.contrib import admin
from django.urls import path,include

from Login.views import delete_user, getuser, getuser_by_email


urlpatterns = [
    path('', include('Login.urls')),
    path('admin/', admin.site.urls),
    path('api/user/<int:code>', getuser, name='getuser'),
    path('api/user/delete', delete_user, name='delete_user'),
    path('api/users', getuser_by_email, name='getuser_email'),
]
