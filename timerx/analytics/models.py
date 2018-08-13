from mongoengine import *
from timerx.secrets import MONGODB_PWD, MONGODB_USERNAME


connect('timerx-dev-server', host='127.0.0.1', port=27017, 
        username=MONGODB_USERNAME, password=MONGODB_PWD)


class Resources(EmbeddedDocument):
    accountId = StringField()
    ARN = StringField()
    type = StringField()
    

class CloudTrailLog(DynamicDocument):
    eventVersion = StringField(required=True)
    userIdentity = DictField(required=True)
    eventTime = DateTimeField(required=True)
    eventSource = StringField()
    eventName = StringField(required=True)
    awsRegion = StringField(required=True)
    requestParameters = DictField()
    requestID = StringField(required=True)
    eventID = StringField(required=True)
    resources = ListField(EmbeddedDocumentField(Resources))
    eventType = StringField(required=True)
    recipientAccountId = StringField()
    sharedEventID = StringField()


class EstimatedUsers(Document):
    userPoolID = StringField(required=True)
    estimatedUsers = IntField(required=True)
    timeStamp = DateTimeField(required=True)


class DynamoDBCount(Document):
    tableName = StringField(required=True)
    entries = IntField(required=True)
    timeStamp = DateTimeField(required=True)


class AWSLoggingHistory(Document):
    service = StringField(required=True)
    timeStamp = DateTimeField(required=True)
    entries = IntField()


class RequestHistory(Document):
    userName = StringField(required=True)
    ip = StringField(required=True)
    collection = StringField(required=True)
    details = DictField(required=True)
    timeStamp = DateTimeField(required=True)
