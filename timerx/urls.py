from django.contrib import admin
from django.urls import include, path, re_path
from rest_framework_simplejwt.views import (
    TokenObtainPairView, TokenRefreshView, TokenVerifyView
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('webanalytics.urls')),
    path('api-auth/', include('rest_framework.urls')),
    re_path(r'^api/token/$', TokenObtainPairView.as_view(),
            name='token_obtain_pair'),
    re_path(r'^api/token/refresh/$', TokenRefreshView.as_view(),
            name='token_refresh'),
    re_path(r'^api/token/verify/$', TokenVerifyView.as_view(),
            name='token_verify')
]
