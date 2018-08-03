from django.http import HttpResponse
from django.shortcuts import render
from mongoengine import *

def index(request):
    return HttpResponse(status=200)
