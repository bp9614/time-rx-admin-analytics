import datetime
import boto3


class AWS:

    def __init__(self, access_key, secret_key, region='us-east-1'):
        self.session = boto3.Session(aws_access_key_id=access_key,
                                     aws_secret_access_key=secret_key,
                                     region_name=region)

    def lookup_events(self, **kwargs):
        return self.session.client('cloudtrail').lookup_events(**kwargs)

    def describe_user_pool(self, user_pool_id):
        return self.session.client('cognito-idp').describe_user_pool(
            UserPoolId=user_pool_id)
    
    def dynamodb_table_count(self, table_name):
        return self.session.client('dynamodb').describe_table(
            TableName=table_name)