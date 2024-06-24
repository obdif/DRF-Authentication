from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _ 
from .managers import *
from rest_framework_simplejwt.tokens import RefreshToken


# Email Address: test@gmail.com
# _(First Name): Test
# _(Last Name): Tester
# Password: test

# Email Address: blessing@gmail.com
# _(First Name): Adeola
# _(Last Name): Blessing
# pass: 1234567


AUTH_PROVIDERS={
    'email':'email',
    'google':'google',
    'github':'github',
    'facebook':'facebook'
}

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=355, unique=True, verbose_name=_("Email Address"))
    first_name = models.CharField(max_length=100, verbose_name="_(First Name)")
    last_name = models.CharField(max_length=100, verbose_name="_(Last Name)")
    is_staff = models.BooleanField(default= False)
    is_superuser = models.BooleanField(default= False)
    is_verified = models.BooleanField(default= False)
    is_actuve = models.BooleanField(default= False)
    date_joined = models.DateTimeField(auto_now_add = True)
    last_login = models.DateTimeField(auto_now = True)
    auth_provider = models.CharField(max_length=100, default=AUTH_PROVIDERS.get("email"))
    
    
    USERNAME_FIELD = 'email'
    
    REQUIRED_FIELDS = [ "first_name", "last_name"]
    
    objects= UserManager()
    
    
    def __str__(self):
        return self.email
    
    
    @property
    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"
    
    
    
    def tokens(self):
        refresh=RefreshToken.for_user(self)
        return {
            'refresh':str(refresh),
            'access':str(refresh.access_token)
        }
    

class OneTimePassword(models.Model):
    user=models.OneToOneField(User, on_delete=models.CASCADE)
    code=models.CharField(max_length=6, unique=True)
    
    def __str__(self):
        return f"{self.user.first_name}-passcode"