import datetime
import boto3


class AWS:

    def __init__(self, access_key, secret_key, region='us-east-1'):
        self.session = boto3.Session(aws_access_key_id=access_key,
                                     aws_secret_access_key=secret_key,
                                     region_name=region)

    def get_cloudtrail_logs(self, **kwargs):
        return self.session.client('cloudtrail').lookup_events(**kwargs)
