from rest_framework import serializers
from .models import Account, Category, Transaction, Debt

class AccountSerializer(serializers.ModelSerializer):
	class Meta:
		model = Account
		fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
	class Meta:
		model = Category
		fields = '__all__'

class TransactionSerializer(serializers.ModelSerializer):
	class Meta:
		model = Transaction
		fields = '__all__'

class DebtSerializer(serializers.ModelSerializer):
	class Meta:
		model = Debt
		fields = '__all__'