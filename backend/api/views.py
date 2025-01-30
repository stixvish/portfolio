from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Sum, F, Value, DecimalField
from django.db.models.functions import Coalesce
from .models import Transactions
from .serializers import TransactionsSerializer

# Create your views here.
class TransactionsViewSet(ModelViewSet):
	queryset = Transactions.objects.all()
	serializer_class = TransactionsSerializer

@api_view(['GET'])
def categorySpending(request):
    # Group transactions by category and calculate total spending per category
    spending = Transactions.objects.annotate(
        net_amount=F('amount') - Coalesce(F('repaid'), Value(0, output_field=DecimalField()))
    ).values('category').annotate(
        total=Sum('net_amount')
    ).order_by('category')
    return Response(spending)
