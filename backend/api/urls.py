from django.urls import path
from .views import AccountList, CategoryList, TransactionList, DebtList

urlpatterns = [
	path('accounts/', AccountList.as_view(), name='account-list'),
	path('categories/', CategoryList.as_view(), name='category-list'),
  path('transactions/', TransactionList.as_view(), name='transaction-list'),
  path('debt/', DebtList.as_view(), name='debt-list'),
]