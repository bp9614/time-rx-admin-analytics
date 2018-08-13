import datetime
import json
import re
import jwt
from django.contrib.auth.models import User
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from timerx.settings import SECRET_KEY
from analytics.models import (
    AWSLoggingHistory, CloudTrailLog, DynamoDBCount, EstimatedUsers,
    RequestHistory
)

@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def query(request):
    details = json.loads(request.body)

    if ({'asChart', 'asHistory'} & details.keys()) and \
            (details.get('asChart', None) or details.get('asHistory', None)):
        if {'collection'} & details.keys():
            collection = details['collection']

            RequestHistory(userName=get_username(request),
                        ip=get_client_ip(request), collection=collection,
                        details=details, timeStamp=datetime.datetime.now())\
                .save()
            
            query_func = get_query_function(collection)

            if query_func:
                return JsonResponse(query_func(**details), status=200)

            return JsonResponse({'error': 'Invalid collection'}, status=400)

        return JsonResponse({'error': 'Missing collection'}, status=400)

    return JsonResponse({'error': 'No containers'}, status=400)


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def username(request):
    return JsonResponse({'username': get_username(request)}, status=200)


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def get_fields(request):
    regex = re.compile('.')

    data = {
        'CloudTrail': {
            'userName': list(set(
                log.userIdentity['userName'] for log 
                in CloudTrailLog.objects(userIdentity__userName=regex))),
            'eventName': CloudTrailLog.objects.distinct('eventName'),
            'tableName': list(set(
                log.requestParameters['tableName'] for log
                in CloudTrailLog.objects(requestParameters__tableName=regex))),
            'eventSource': CloudTrailLog.objects.distinct('eventSource'),
        },
        'DynamoDB': {
            'tableNames': DynamoDBCount.objects.distinct('tableName')
        },
        'History': {
            'collection': RequestHistory.objects.distinct('collection'),
            'username': RequestHistory.objects.distinct('userName'),
            'service': AWSLoggingHistory.objects.distinct('service'),
        }
    }

    return JsonResponse(json.dumps(data), status=200, safe=False)


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
    logs = CloudTrailLog.objects(
        eventTime__gte=kwargs['startDate'], eventTime__lt=kwargs['endDate'])\
        .order_by('eventTime')

    response = {}

    if logs:
        if kwargs['asHistory']:
            response['historyTitle'] = 'CloudTrail History'

            response['history'] = ['{0} has perform a {1} at {2}'.format(
                log['userIdentity']['userName'] 
                if log['userIdentity'].get('userName', None) else 'System',
                log['eventName'], log['eventTime']
            ) for log in logs[:int(kwargs['results'])]][::-1]
        
        if kwargs['asChart']:
            if len(logs) > 20:
                logs = [logs[log] for log 
                        in range(0, len(logs), len(logs) // 20)]

            response['chartTitle'] = 'CloudTrail Log Count'

            response['chart'] = {
                'labels': [log['eventTime'] for log in logs],
                'datasets': [{
                    'label': 'Number of Logs',
                    'data': [CloudTrailLog.objects(eventTime__lt=log['eventTime'])\
                                .count() for log in logs]
                }]
            }
    
    return response
    


def query_cognito(**kwargs):
    logs = EstimatedUsers.objects(
        timeStamp__gte=kwargs['startDate'], timeStamp__lt=kwargs['endDate'])\
        .order_by('timeStamp')
    
    response = {}

    if logs:
        if kwargs['asHistory']:
            response['historyTitle'] = 'Cognito History'

            response['history'] = ['Pool {0} has {1} users at {2}'.format(
                log['userPoolID'],
                log['estimatedUsers'],
                log['timeStamp'],
            ) for log in logs[:int(kwargs['results'])]][::-1]
        
        if kwargs['asChart']:
            if len(logs) > 20:
                logs = [logs[log] for log 
                        in range(0, len(logs), len(logs) // 20)]

            response['chartTitle'] = 'Estimated Users Count'

            response['chart'] = {
                'labels': [log['timeStamp'] for log in logs],
                'datasets': [{
                    'label': 'Estimated Users Conut',
                    'data': [log['estimatedUsers'] for log in logs]
                }]
            }
    
    return response


def query_dynamodb(**kwargs):
    logs = DynamoDBCount.objects(
        timeStamp__gte=kwargs['startDate'], timeStamp__lt=kwargs['endDate'])\
        .order_by('timeStamp')

    response = {}

    if logs:
        if kwargs['asHistory']:
            response['historyTitle'] = 'DynamoDB Entries'

            response['history'] = ['Table {0} has {1} entries at {2}'.format(
                log['tableName'],
                log['entries'],
                log['timeStamp'],
            ) for log in logs[:int(kwargs['results'])]][::-1]
        
        if kwargs['asChart']:
            if len(logs) > 20:
                logs = [logs[log] for log 
                        in range(0, len(logs), len(logs) // 20)]

            response['chartTitle'] = 'DynamoDB Entry Count'

            response['chart'] = {
                'labels': [log['timeStamp'] for log in logs],
                'datasets': [{
                    'label': 'Entry Count',
                    'data': [log['entries'] for log in logs]
                }]
            }
    
    return response


def query_history(**kwargs):
    logs = RequestHistory.objects(
        timeStamp__gte=kwargs['startDate'], timeStamp__lt=kwargs['endDate'])\
        .order_by('timeStamp')

    response = {}

    if logs:
        if kwargs['asHistory']:
            response['historyTitle'] = 'Request History'

            response['history'] = ['{0} has been accessed at {1}'.format(
                log['collection'], log['timeStamp'],
            ) for log in logs[:int(kwargs['results'])]][::-1]
    
    return response


def parseDate(date):
    return datetime.datetime.strptime(date, '%m/%d/%Y')


def get_query_function(collection):
    return {
        'CloudTrail': query_cloudtrail,
        'Cognito': query_cognito,
        'DynamoDB': query_dynamodb,
        'History': query_history,
    }.get(collection, None)
