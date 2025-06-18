from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.urls import path
from Login.views import register, test, verf

urlpatterns = [
    path('api/gettoken', TokenObtainPairView.as_view()),
    path('api/reftoken', TokenRefreshView.as_view()),
    path('api/verify', verf),
    path('register', register),

]
