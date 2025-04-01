from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Account, Category, Transaction, Debt
from .serializers import AccountSerializer, CategorySerializer, TransactionSerializer, DebtSerializer

# Create your views here.
class AccountList(APIView):
  def get(self, request):
    items = Account.objects.all()
    serializer = AccountSerializer(items, many=True)
    return Response(serializer.data)

  def post(self, request):
    serializer = AccountSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CategoryList(APIView):
  def get(self, request):
    items = Category.objects.all()
    serializer = CategorySerializer(items, many=True)
    return Response(serializer.data)

  def post(self, request):
    serializer = CategorySerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TransactionList(APIView):
  def get(self, request):
    items = Transaction.objects.all()
    serializer = TransactionSerializer(items, many=True)
    return Response(serializer.data)

  def post(self, request):
    serializer = TransactionSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
class DebtList(APIView):
  def get(self, request):
    items = Debt.objects.all()
    serializer = DebtSerializer(items, many=True)
    return Response(serializer.data)

  def post(self, request):
    serializer = DebtSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)