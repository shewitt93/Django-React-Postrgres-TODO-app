from rest_framework import viewsets

from .serializers import ToDoSerializer
from todos.models import Todo

class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = ToDoSerializer
