from django.http import JsonResponse, HttpResponse
from django.utils.decorators import method_decorator
from django.views.generic import View
from django.views.decorators.csrf import csrf_exempt
from django.db import Error, IntegrityError
from django.db.transaction import atomic
from psycopg2 import errorcodes
import json

from .models import *

def retry_on_exception(num_retries=3, on_failure=HttpResponse(status=500), delay_=0.5, backoff_=1.5):
    def retry(view):
        def wrapper(*args, **kwargs):
            delay = delay_
            for i in range(num_retries):
                try:
                    return view(*args, **kwargs)
                except IntegrityError as ex:
                    if i == num_retries - 1:
                        return on_failure
                    elif getattr(ex.__cause__, 'pgcode', '') == errorcodes.SERIALIZATION_FAILURE:
                        time.sleep(delay)
                        delay *= backoff_
                except Error as ex:
                    return on_failure
        return wrapper
    return retry

@method_decorator(csrf_exempt, name='dispatch')
class UserStatesView(View):
    def get(self, request, token=None, *args, **kwargs):
        if token is None:
            users = list(UserState.objects.values())
        else:
            users = list(UserState.objects.filter(token=token).values())
        return JsonResponse(users, safe=False)

    @retry_on_exception(3)
    @atomic
    def post(self, request, *args, **kwargs):
        form_data = json.loads(request.body.decode())
        token = form_data['token']
        money = form_data['money']
        user = UserState(token=token, money=money)
        user.save()
        return HttpResponse(status=200)

    @retry_on_exception(3)
    @atomic
    def patch(self, request, *args, **kwargs):
        form_data = json.loads(request.body.decode())
        token, money = form_data['token'], form_data['money']
        products = form_data['products'] if 'products' in form_data else None
        if token is None:
            return HttpResponse(status=404)
        if products is None:
            UserState.objects.filter(token=token).update(money=money)
        else:
            UserState.objects.filter(token=token).update(money=money, products=products)
        return HttpResponse(status=200)


@method_decorator(csrf_exempt, name='dispatch')
class GameProductsView(View):
    def get(self, request, gameName=None, *args, **kwargs):
        if gameName is None:
            games = list(GameProduct.objects.values())
        else:
            games = list(GameProduct.objects.filter(gameName=gameName).values())
        return JsonResponse(games, safe=False)

    @retry_on_exception(3)
    @atomic
    def post(self, request, *args, **kwargs):
        form_data = json.loads(request.body.decode())
        gameName = form_data['gameName']
        originalPrice = form_data['originalPrice']
        discountPrice = form_data['discountPrice']
        gameProducts = GameProduct(gameName=gameName, originalPrice=originalPrice, discountPrice=discountPrice)
        gameProducts.save()
        return HttpResponse(status=200)

@method_decorator(csrf_exempt, name='dispatch')
class OrdersView(View):
    def get(self, request, token=None, *args, **kwargs):
        if token is None:
            orders = list(Order.objects.values())
        else:
            orders = list(Order.objects.filter(token=token).values())
        return JsonResponse(orders, safe=False)

    @retry_on_exception(3)
    @atomic
    def post(self, request, *args, **kwargs):
        form_data = json.loads(request.body.decode())
        gameName = form_data['gameName']
        price = form_data['price']
        action = form_data['action']
        token = form_data['token']
        orders = Order(token=token, price=price, action=action, gameName=gameName)
        users = UserStates.objects.get(token=token)
        if action == "buy":
            users.products += (',' if users.products != "" else "") + games.gameName
            users.money -= price
            users.save()
        else:
            products = users.products.split(',')
            for i in range(len(products)):
                if products[i] == gameName:
                    products[i] = ''
                    break
            users.products = ','.join(products)
            users.money += price
            users.save()
        orders.save()
        return JsonResponse(list(UserState.objects.filter(token=token).values()), safe=False)