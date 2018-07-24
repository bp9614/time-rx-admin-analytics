import os
import pandas as pd
from mongoengine import *
from timerx.secrets import MONGODB_PWD, MONGODB_USERNAME


connect('timerx-dev-server', username=MONGODB_USERNAME, password=MONGODB_PWD)


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
    requredParameters = DictField()
    requestID = StringField(required=True)
    eventID = StringField(required=True)
    resources = ListField(EmbeddedDocumentField(Resources))
    eventType = StringField(required=True)
    recipientAccountId = StringField()
    sharedEventID = StringField()