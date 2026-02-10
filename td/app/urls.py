from django.urls import path
from .views import *


urlpatterns = [
    path('', index, name='index'),
    path("list/", TaskList.as_view()),       # GET
    path("create/", TaskCreate.as_view()),   # POST
    path("update/<int:pk>/", TaskUpdate.as_view()),  # PATCH
    path("delete/<int:pk>/", TaskDelete.as_view()),  # DELETE
]

