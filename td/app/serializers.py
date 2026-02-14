from .models import *
from rest_framework import serializers

class TaskCreateSerializer(serializers.ModelSerializer):
    name = serializers.CharField(min_length=1)

    class Meta:
        model = Task
        fields = ['name']


class TaskUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['completed', 'name']


class TaskSerializer(serializers.ModelSerializer):
    name = serializers.CharField(min_length=1)

    class Meta:
        model = Task
        fields = ['id', 'name', 'created', 'completed']


