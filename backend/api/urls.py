from django.urls import path, include
from rest_framework import routers
from .views import (
    AccountViewSet, CategoryViewSet, PointRuleViewSet,
    TransactionViewSet, DebtViewSet, PaymentViewSet
)

router = routers.DefaultRouter()
router.register(r'accounts', AccountViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'pointrules', PointRuleViewSet)
router.register(r'transactions', TransactionViewSet)
router.register(r'debts', DebtViewSet)
router.register(r'payments', PaymentViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
