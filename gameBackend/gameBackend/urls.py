"""gameBackend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from .views import UserStatesView, GameProductsView, OrdersView

urlpatterns = [
    path('admin/', admin.site.urls),

    path('userstates/', UserStatesView.as_view(), name='userstates'),
    path('userstates/<str:token>/', UserStatesView.as_view(), name='userstates'),

    path('gameproducts/', GameProductsView.as_view(), name='gameproducts'),
    path('gameproducts/<str:gameName>/', GameProductsView.as_view(), name='gameproducts'),

    path('orders/', OrdersView.as_view(), name='orders'),
    path('orders/<str:token>/', OrdersView.as_view(), name='orders'),
]
