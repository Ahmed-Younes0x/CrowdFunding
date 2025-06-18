from rest_framework import serializers
from .models import Custom_User

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Custom_User
        fields = [
            'id',
            'username',
            'first_name',
            'last_name',
            'email',
            'phone',
            'profile_image',
            'token',
            'is_active',
            'is_superuser',
            'is_staff',
            'date_joined',
            'last_login',
        ]
        read_only_fields = ['id', 'date_joined', 'last_login', 'is_superuser', 'is_staff']
