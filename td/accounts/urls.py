from django.urls import path
from .views import *


urlpatterns = [
    path("user/", user_detail),
    path("signup/", SignUp.as_view(), name="signup"),
    path("login/", MyLoginView.as_view(), name="login"),
    path("logout/", MyLogoutView.as_view(), name="logout")
]