from redis import Redis
from rq import Queue, Worker
import os
from dotenv import load_dotenv

load_dotenv()
REDIS_URL = os.getenv('REDIS_URL')
REDIS_PORT = os.getenv('REDIS_PORT')


redis_connection = Redis(host=REDIS_URL, port=REDIS_PORT, db=0)
q = Queue(connection=redis_connection)

print("Starting worker")
w = Worker([q], connection=redis_connection)
w.work()
