from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.views import LoginView, LogoutView
from django.views.generic.edit import CreateView
from .forms import *
from django.contrib.auth import get_user_model, login
from rest_framework.permissions import IsAuthenticated
from django.urls import reverse_lazy

User = get_user_model()

def user_detail(request):
    if request.method == "GET":
        data = None
        if request.user.is_authenticated:
            data = {'username': request.user.username}
        return JsonResponse(data, safe=False)

class SignUp(CreateView):
    model = User
    form_class = SignUpForm
    success_url = 'http://localhost:5173/static/'
    template_name = 'signup.html'

    def form_valid(self, form):
        response = super().form_valid(form)
        user = self.object
        login(self.request, user)
        print(f'{user.username} зарегестрировался')
        return response

class MyLoginView(LoginView):
    template_name = "login.html"
    redirect_authenticated_user = True

    def get_success_url(self):
        print(f'пользователь вошол')
        return 'http://localhost:5173/static/'


class MyLogoutView(LogoutView):
    next_page = reverse_lazy("login")
    permission_classes = [IsAuthenticated]