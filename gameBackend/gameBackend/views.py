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
            users = list(UserStates.objects.values())
        else:
            users = list(UserStates.objects.filter(token=token).values())
        return JsonResponse(users, safe=False)

    @retry_on_exception(3)
    @atomic
    def post(self, request, *args, **kwargs):
        form_data = json.loads(request.body.decode())
        token = form_data['token']
        money = form_data['money']
        user = UserStates(token=token, money=money)
        user.save()
        return HttpResponse(status=200)

    @retry_on_exception(3)
    @atomic
    def patch(self, request, token=None, *args, **kwargs):
        if token is None:
            return HttpResponse(status=404)
        user = list(UserStates.objects.filter(token=token).values())[0]
        form_data = json.loads(request.body.decode())
        money, products = form_data['money'], form_data['products']
        user.money = money
        user.products = products
        user.save()
        return HttpResponse(status=200)