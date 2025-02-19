# Generated by Django 5.1.5 on 2025-02-04 05:36

import django.core.validators
import django.db.models.deletion
import django.utils.timezone
from decimal import Decimal
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_transactions_table'),
    ]

    operations = [
        migrations.CreateModel(
            name='Account',
            fields=[
                ('aid', models.AutoField(primary_key=True, serialize=False)),
                ('aname', models.CharField(max_length=100)),
                ('atype', models.CharField(max_length=50)),
                ('balance', models.DecimalField(decimal_places=2, default=0.0, max_digits=12)),
            ],
            options={
                'db_table': 'account',
            },
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('cid', models.AutoField(primary_key=True, serialize=False)),
                ('cname', models.CharField(max_length=100, unique=True)),
                ('ctype', models.CharField(max_length=50)),
            ],
            options={
                'db_table': 'category',
            },
        ),
        migrations.CreateModel(
            name='Debt',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('borrowerName', models.CharField(max_length=100)),
                ('amountOwed', models.DecimalField(decimal_places=2, max_digits=12)),
                ('amountRepaid', models.DecimalField(decimal_places=2, default=0, max_digits=12)),
            ],
            options={
                'db_table': 'debt',
            },
        ),
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('pid', models.AutoField(primary_key=True, serialize=False)),
                ('pdate', models.DateField(default=django.utils.timezone.now)),
                ('amount', models.DecimalField(decimal_places=2, max_digits=12, validators=[django.core.validators.MinValueValidator(Decimal('0.01'))])),
                ('aidFrom', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='payments_sent', to='api.account')),
                ('aidTo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='payments_received', to='api.account')),
            ],
            options={
                'db_table': 'payment',
            },
        ),
        migrations.CreateModel(
            name='PointRule',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pointsPerDollar', models.DecimalField(decimal_places=2, default=1.0, max_digits=5)),
                ('account', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.account')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.category')),
            ],
            options={
                'db_table': 'pointrule',
                'unique_together': {('account', 'category')},
            },
        ),
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('tid', models.AutoField(primary_key=True, serialize=False)),
                ('tdate', models.DateField(default=django.utils.timezone.now)),
                ('amount', models.DecimalField(decimal_places=2, max_digits=12, validators=[django.core.validators.MinValueValidator(Decimal('0.01'))])),
                ('description', models.TextField(blank=True, null=True)),
                ('pointsEarned', models.DecimalField(decimal_places=2, default=0, max_digits=12)),
                ('isShared', models.BooleanField(default=False)),
                ('account', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.account')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.category')),
            ],
            options={
                'db_table': 'transaction',
            },
        ),
        migrations.DeleteModel(
            name='Transactions',
        ),
        migrations.AddField(
            model_name='debt',
            name='transaction',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.transaction'),
        ),
        migrations.AlterUniqueTogether(
            name='debt',
            unique_together={('transaction', 'borrowerName')},
        ),
    ]
