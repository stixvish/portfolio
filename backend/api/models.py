from django.db import models

# Create your models here.
class AccountType(models.Model):
	atype_id = models.AutoField(primary_key=True)
	description = models.CharField(max_length=50)
	def __str__(self):
		return self.name

class Account(models.Model):
	aid = models.AutoField(primary_key=True)
	aname = models.CharField(max_length=75)
	atype_id = models.ForeignKey(AccountType, on_delete=models.CASCADE, db_column='atype_id')
	balance = models.DecimalField(max_digits=6, decimal_places=2, default=0)
	def __str__(self):
		return self.name
	
class CategoryType(models.Model):
	ctype_id = models.AutoField(primary_key=True)
	description = models.CharField(max_length=75)
	def __str__(self):
		return self.name

class Category(models.Model):
	cid = models.AutoField(primary_key=True)
	cname = models.CharField(max_length=75)
	ctype_id = models.ForeignKey(CategoryType, on_delete=models.CASCADE, default=1, db_column='ctype_id')
	def __str__(self):
		return self.name
	
class PointRules(models.Model):
	rid = models.AutoField(primary_key=True)
	aid = models.ForeignKey(Account, on_delete=models.CASCADE)
	cid = models.ForeignKey(Category, on_delete=models.CASCADE)
	multiplier = models.DecimalField(max_digits=4, decimal_places=2, default=0)
	def __str__(self):
		return self.name
	class Meta:
		unique_together = (('aid', 'cid'),)

class Transaction(models.Model):
	tid = models.AutoField(primary_key=True)
	tdate = models.DateField()
	description = models.CharField(max_length=255)
	category = models.ForeignKey(Category, on_delete=models.CASCADE)
	amount = models.DecimalField(max_digits=6, decimal_places=2)
	card = models.ForeignKey(Account, on_delete=models.CASCADE)
	shared = models.BooleanField()
	points = models.DecimalField(max_digits=6, decimal_places=2, default=0)
	def __str__(self):
		return self.name
	
class Debt(models.Model):
	did = models.AutoField(primary_key=True)
	tid = models.ForeignKey(Transaction, on_delete=models.CASCADE)
	debtor = models.CharField(max_length=50)
	amount = models.DecimalField(max_digits=6, decimal_places=2)
	def __str__(self):
		return self.name
	class Meta:
		unique_together = (('tid', 'debtor'),)