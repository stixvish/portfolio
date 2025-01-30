from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TransactionsViewSet, categorySpending

router = DefaultRouter()
router.register(r'transactions', TransactionsViewSet, basename='transactions')

urlpatterns = [
    path('', include(router.urls)),
    path('category-spending/', categorySpending),
]
