# TIME-RX the HIPAA-Compliant Medicine Scheduling Application

## Requirements
* Python 3
* Django 2.0+
* Broker for Celery (e.g. RabbitMQ, Redis, etc.)

## Installation
```sh
git clone https://github.com/bp9614/time-rx-admin-analytics
```

```sh
cd timerx
pip install -r requirements
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

