import os
import pandas as pd
from mongoengine import *
from timerx.settings import MONGODB_USER_PASSWORD_LOC

username, password = pd.read_csv(
    MONGODB_USER_PASSWORD_LOC, index_col=0).iloc[0]

connect('timerx-dev-server', username=username, password=password)


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