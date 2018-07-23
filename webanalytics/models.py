import os
import pandas as pd
from mongoengine import *
from timerx.settings import MONGODB_USER_PASSWORD

username, password = pd.read_csv(
    os.path.join('.keys', MONGODB_USER_PASSWORD), index_col=0).iloc[0]

connect('timerx-dev-server', username=username, password=password)


class Resources(EmbeddedDocument):
    resources = DictField()


class CloudTrailEvent(DynamicDocument):
    eventVersion = StringField()
    userIdentity = DictField()
    eventTime = DateTimeField()
    eventSource = StringField()
    eventName = StringField()
    awsRegion = StringField()
    requredParameters = DictField()
    requestID = StringField(required=True)
    eventID = StringField(required=True)
    resources = ListField(EmbeddedDocumentField(Resources))
    eventType = StringField()
    recipientAccountId = StringField()
    sharedEventID = StringField()