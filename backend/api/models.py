from django.db import models

# Create your models here.
class Transactions(models.Model):
	transactionid = models.AutoField(primary_key=True)
	transactiondate = models.DateField()
	description = models.CharField(max_length=255)
	category = models.CharField(max_length=100)
	amount = models.DecimalField(max_digits=10, decimal_places=2)
	lent = models.DecimalField(max_digits=10, decimal_places=2)
	repaid = models.DecimalField(max_digits=10, decimal_places=2)
	card = models.CharField(max_length=50)

	class Meta:
		db_table = 'transactions'