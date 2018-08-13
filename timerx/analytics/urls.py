from django.urls import path
from analytics import views

urlpatterns = [
    path('fields', views.get_fields, name='fields'),
    path('query', views.query, name='query'),
    path('username', views.username, name='username')
]