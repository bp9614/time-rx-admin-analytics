# TIME-RX the HIPAA-Compliant Medicine Scheduling Application

Special Instructions
```
NOTE: Unlike the User Analytics, the Admin Analytics is only meant to be run within the network.
The program is not meant to be seen by anyone other than the administrators, which would be on
the current network.
```

## Requirements
* Python 3
* Django 2.0+
* Broker for Celery (e.g. RabbitMQ, Redis, etc.)
* MongoDB server

## Installation
```sh
git clone https://github.com/bp9614/time-rx-admin-analytics
```

```sh
cd timerx
pip install -r requirements
```

## How to create a MongoDB server to pull logs
1. Download the MongoDB community server for locally run sources (can also be ran on ALTAS, but must be configured)
2. After installing MongoDB, run MongoDB with
If Windows:
```
"C:\Program Files\MongoDB\Server\4.0\bin\mongod.exe"
```
If macOS:
```
mongod
```
3. Follow Instructions to create an admin user
```
https://docs.mongodb.com/manual/tutorial/manage-users-and-roles/
```
4. Create a DB named timerx-dev-server
5. Restart the MongoDB server with authentication.
If Windows:
```
"C:\Program Files\MongoDB\Server\4.0\bin\mongod.exe" --auth
```
If macOS:
```
mongod --auth
```

## How to start Django server
1. Move to the timerx folder
```
cd timerx
```
2. Run the Django Server
```
python manage.py runserver
```

## How to run Celery to pull logs
1. Install and start broker server
..* If using a broker other than RabbitMQ + default settings, enter broker details into timerx/timerx/settings.py file
2. Start MongoDB server
..* Adjust connect(host=..., port=...) to MonogDB's location
3. In a command prompt/shell, move into the project folder
4. Start the periodic tasks with 
```sh
celery -A timerx beat --loglevel=info
```
5. Start the workers from broker with
```sh
celery -A timerx worker --loglevel=info -P eventlet --concurrency 1
```
..* -P eventlet is not required in macOS/Linux
..* --concurrency 1 is used to spawn only 1 process instead of 8+

