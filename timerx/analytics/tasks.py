import json
import datetime

from timerx.celery import app as celery_app
from timerx.secrets import (
    AWS_ACCESS_KEY, AWS_SECRET_KEY, DYNAMODB_TABLES, TIMERX_USER_POOL
)
from analytics.aws import AWS
from analytics.models import (
    AWSLoggingHistory, CloudTrailLog, DynamoDBCount, EstimatedUsers, Resources
)

aws = AWS(AWS_ACCESS_KEY, AWS_SECRET_KEY)

@celery_app.on_after_finalize.connect
def setup_periodic_tasks(sender, **kwargs):
    sender.add_periodic_task(datetime.timedelta(minutes=30), 
                             get_cloudtrail_logs.s(), 
                             name='Get CloudTrial Logs (1/2 hr delay)')
    sender.add_periodic_task(datetime.timedelta(minutes=30), 
                             get_estimated_users.s(TIMERX_USER_POOL),
                             name='Get Estimated Users (1/2 hr delay)')
    for table in DYNAMODB_TABLES:
        sender.add_periodic_task(datetime.timedelta(minutes=30),
                                 get_dynamodb_entry_count.s(table),
                                 name='Get Table Entry Count (1/2 hr delay)')


@celery_app.task(ignore_result=True)
def get_cloudtrail_logs(**kwargs):
    attributes = {'MaxResults': 1000, **kwargs}
    if CloudTrailLog.objects:
        attributes['StartTime'] = \
            CloudTrailLog.objects.order_by('-eventTime').first().eventTime + \
            datetime.timedelta(seconds=1)

    logs = [json.loads(full_event['CloudTrailEvent'])
            for full_event in aws.lookup_events(**attributes)['Events']]
    if logs:
        CloudTrailLog.objects.insert([CloudTrailLog(**log) for log in logs])
    
    AWSLoggingHistory(service='CloudTrail', timeStamp=datetime.datetime.now(),
                      entries=len(logs)).save()


@celery_app.task(ignore_result=True)
def get_estimated_users(user_pool_id):
    EstimatedUsers(userPoolID=user_pool_id, 
                   estimatedUsers=aws.describe_user_pool(
                       user_pool_id)['UserPool']['EstimatedNumberOfUsers'],
                   timeStamp=datetime.datetime.now()).save()
    
    AWSLoggingHistory(service='Cognito', timeStamp=datetime.datetime.now())\
        .save()


@celery_app.task(ignore_result=True)
def get_dynamodb_entry_count(table_name):
    DynamoDBCount(tableName=table_name,
                  estimatedUsers=aws.dynamodb_table_count(
                      table_name)['Table']['ItemCount'],
                  timeStamp=datetime.datetime.now()).save()

    AWSLoggingHistory(service='DynamoDB', timeStamp=datetime.datetime.now())\
        .save()
