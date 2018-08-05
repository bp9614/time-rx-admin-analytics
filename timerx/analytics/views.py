import datetime
import json
import jwt
from django.contrib.auth.models import User
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from timerx.settings import SECRET_KEY
from analytics.models import (
    CloudTrailLog, DynamoDBCount, EstimatedUsers, RequestHistory
)

@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def query(request, component):
    if component in ['chart', 'history']:
        query_details = json.loads(request.body)

        if {'collection', 'options'} <= query_details.keys():
            collection = query_details['collection']
            options = query_details['options']

            RequestHistory(userName=get_username(request),
                        ip=get_client_ip(request), collection=collection,
                        options=options, timeStamp=datetime.datetime.now())\
                .save()
            
            query_func = get_query_function(collection)

            if query_func:
                return JsonResponse(query_func(component, **options),
                                    status=400)

            return JsonResponse({'error': 'Invalid collection'}, status=400)

        return JsonResponse({'error': 'Missing collection or options'},
                            status=400)

    return JsonResponse({'error': 'Invalid component type'}, status=400)


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def username(request):
    return JsonResponse({'username': get_username(request)}, status=200)


def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


def get_username(request):
    token = request.META['HTTP_AUTHORIZATION'].split(' ', 1)[1]
    user_id = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])['user_id']

    return User.objects.get(id=user_id).username


def query_cloudtrail(**kwargs):
    pass


def query_cognito(**kwargs):
    pass


def query_dynamodb(**kwargs):
    pass


def query_history(**kwargs):
    if 'any' in kwargs:
        pass

    if 'merge' in kwargs:
        pass


def get_query_function(collection):
    return {
        'CloudTrail': query_cloudtrail,
        'Cognito': query_cognito,
        'DynamoDB': query_dynamodb,
        'History': query_history,
    }.get(collection, None)
