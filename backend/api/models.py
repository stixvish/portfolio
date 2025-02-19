from django.db import models
from django.core.validators import MinValueValidator
from django.utils import timezone
from decimal import Decimal

class Account(models.Model):
    # The aid field corresponds to the SQL SERIAL PRIMARY KEY.
    aid = models.AutoField(primary_key=True)
    aname = models.CharField(max_length=100)
    atype = models.CharField(max_length=50)
    balance = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)

    class Meta:
        db_table = 'account'

    def __str__(self):
        return self.aname


class Category(models.Model):
    cid = models.AutoField(primary_key=True)
    cname = models.CharField(max_length=100, unique=True)
    ctype = models.CharField(max_length=50)

    class Meta:
        db_table = 'category'

    def __str__(self):
        return self.cname


class PointRule(models.Model):
    # Represents the many-to-many relationship between Account and Category,
    # with an extra field (pointsPerDollar).
    account = models.ForeignKey(
        Account,
        on_delete=models.CASCADE,
        db_column='aid',
        primary_key=True
    )
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        db_column='cid' 
    )
    pointsperdollar = models.DecimalField(max_digits=5, decimal_places=2, default=1.0)

    class Meta:
        unique_together = (("account", "category"),)
        db_table = 'pointrule'

    def __str__(self):
        return f"{self.account} - {self.category}"


class Transaction(models.Model):
    tid = models.AutoField(primary_key=True)
    account = models.ForeignKey(
        Account,
        on_delete=models.CASCADE,
        db_column='aid'
    )
    category = models.ForeignKey(
        Category, 
        on_delete=models.CASCADE,
        db_column='cid'
    )
    tdate = models.DateField(default=timezone.now)
    # Ensure the amount is greater than 0 with a validator.
    amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        validators=[MinValueValidator(Decimal('0.01'))]
    )
    description = models.TextField(blank=True, null=True)
    pointsearned = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    isshared = models.BooleanField(default=False)

    class Meta:
        db_table = 'transaction'

    def __str__(self):
        return f"Transaction {self.tid}"


class Debt(models.Model):
    # Each Debt is linked to a Transaction.
    tid = models.ForeignKey(Transaction, on_delete=models.CASCADE, db_column='tid', primary_key=True)
    borrowername = models.CharField(max_length=100)
    amountowed = models.DecimalField(max_digits=12, decimal_places=2)
    amountrepaid = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    class Meta:
        db_table = 'debt'
        unique_together = (('tid', 'borrowername'),)

    def __str__(self):
        return f"Debt for {self.borrowerName} on Transaction {self.transaction.tid}"

class Payment(models.Model):
    pid = models.AutoField(primary_key=True)
    # aidFrom and aidTo are both foreign keys to Account.
    aidfrom = models.ForeignKey(
        Account,
        on_delete=models.CASCADE,
        related_name='payments_sent',
        db_column='aidfrom'
    )
    aidto = models.ForeignKey(
        Account,
        on_delete=models.CASCADE,
        related_name='payments_received',
        db_column='aidto'
    )
    pdate = models.DateField(default=timezone.now)
    amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        validators=[MinValueValidator(Decimal('0.01'))]
    )

    class Meta:
        db_table = 'payment'

    def __str__(self):
        return f"Payment {self.pid} from {self.aidFrom} to {self.aidTo}"
