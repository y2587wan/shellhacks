# Generated by Django 3.2.7 on 2021-09-25 16:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('gameBackend', '0002_auto_20210925_1555'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='GameProducts',
            new_name='GameProduct',
        ),
        migrations.RenameModel(
            old_name='Orders',
            new_name='Order',
        ),
        migrations.RenameModel(
            old_name='UserStates',
            new_name='UserState',
        ),
    ]