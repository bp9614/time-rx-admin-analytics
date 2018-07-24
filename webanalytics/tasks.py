import json
from datetime import timedelta

import pandas as pd

from timerx.celery import app as celery_app
from timerx.settings import ACCESS_KEY_LOC
from webanalytics.aws import AWS
from webanalytics.models import CloudTrailLog, Resources

access_key, secret_key = pd.read_csv(ACCESS_KEY_LOC).iloc[0]
aws = AWS(access_key, secret_key)

@celery_app.on_after_finalize.connect
def setup_periodic_tasks(sender, **kwargs):
    sender.add_periodic_task(timedelta(minutes=30), get_cloudtrail_logs.s(), 
                             name='Half Hour')

@celery_app.task(ignore_result=True)
def get_cloudtrail_logs():
    attributes = {'MaxResults': 1000}
    if CloudTrailLog.objects:
        attributes['StartTime'] = \
            CloudTrailLog.objects.order_by('-eventTime').first().eventTime + \
            timedelta(seconds=1)

    logs = [json.loads(full_event['CloudTrailEvent'])
            for full_event in aws.get_cloudtrail_logs(**attributes)['Events']]
    if logs:
        CloudTrailLog.objects.insert([CloudTrailLog(**log) for log in logs])
