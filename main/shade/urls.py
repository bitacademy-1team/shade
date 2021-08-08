from django.urls import include, path
from rest_framework import routers  # router import
from . import views # views.py import

router = routers.DefaultRouter()  # DefaultRouter 설정
router.register('contents', views.ContentsViewSet)  # ViewSet과 함께 user라는 router 등록

urlpatterns = [
    path('', include(router.urls)),
    path('api_hello/', views.HelloAPI),
    path('api_/cu/', views.ContentsUserAPI)
]