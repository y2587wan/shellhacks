from django.db import models
import uuid

class GameProducts(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    gameName = models.CharField(max_length=250, default="")
    originalPrice = models.DecimalField(decimal_places=2, default=0, max_digits=10)
    discountPrice = models.DecimalField(decimal_places=2, default=0, max_digits=10)

class UserStates(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    token = models.CharField(max_length=250, default="")
    money = models.DecimalField(decimal_places=2, default=1000, max_digits=10)
    products = models.ManyToManyField(GameProducts)

class Orders(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    gameName = models.CharField(max_length=250, default="")
    price = models.DecimalField(decimal_places=2, default=0, max_digits=10)
    token = models.CharField(max_length=250, default="")
    action = models.CharField(max_length=250, default="buy")

