from django.urls import path
from .views import index, ToDoDetailView

urlpatterns = [
    path('', index),
    path('edit/<int:pk>', ToDoDetailView.as_view()),
    path('delete/<int:pk>', ToDoDetailView.as_view())
]