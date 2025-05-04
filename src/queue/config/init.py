import pika

# Conexão com o RabbitMQ
connection = pika.BlockingConnection(pika.ConnectionParameters('queue'))
channel = connection.channel()

# Criar o exchange do tipo 'topic'
exchange_name = 'image_topic_exchange'
channel.exchange_declare(exchange=exchange_name, exchange_type='topic', durable=True)

# Criar as filas
face_queue = 'face_queue'
team_queue = 'team_queue'

channel.queue_declare(queue=face_queue, durable=True)
channel.queue_declare(queue=team_queue, durable=True)

# Vincular as filas ao exchange com as routing keys adequadas
channel.queue_bind(exchange=exchange_name, queue=face_queue, routing_key='face')
channel.queue_bind(exchange=exchange_name, queue=team_queue, routing_key='team')

print(f"Exchange '{exchange_name}' e filas configuradas com sucesso!")
connection.close()