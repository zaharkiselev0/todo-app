from .serializers import *
from .models import *
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .permissions import *
from rest_framework import generics, permissions, status
from rest_framework.response import Response

@login_required
def index(request):
    return render(request, "index.html")


class TaskList(generics.ListAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()
        queryset = queryset.filter(owner=self.request.user).order_by('-created')
        return queryset


class TaskUpdate(generics.UpdateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskUpdateSerializer
    http_method_names = ['patch']
    permission_classes = [permissions.IsAuthenticated, IsTaskOwner]


class TaskCreate(generics.CreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskCreateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        self.instance = serializer.save(owner=self.request.user)

    def create(self, request, *args, **kwargs):
        super().create(request, *args, **kwargs)
        serializer = TaskSerializer(self.instance)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class TaskDelete(generics.DestroyAPIView):
    queryset = Task.objects.all()
    permission_classes = [permissions.IsAuthenticated, IsTaskOwner]

