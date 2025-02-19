from rest_framework import viewsets
from .models import Account, Category, PointRule, Transaction, Debt, Payment
from .serializers import (
    AccountSerializer, CategorySerializer, PointRuleSerializer,
    TransactionSerializer, DebtSerializer, PaymentSerializer
)

class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class PointRuleViewSet(viewsets.ModelViewSet):
    queryset = PointRule.objects.all()
    serializer_class = PointRuleSerializer


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer


class DebtViewSet(viewsets.ModelViewSet):
    queryset = Debt.objects.all()
    serializer_class = DebtSerializer


class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
