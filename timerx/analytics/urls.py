from django.urls import path
from analytics import views

urlpatterns = [
    path('query/<str:component>', views.query, name='query'),
    path('username', views.username, name='username')
]