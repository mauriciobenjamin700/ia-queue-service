import pika
import tempfile
from sqlalchemy import create_engine, Table, Column, Integer, String, Text, MetaData, TIMESTAMP, insert
from datetime import datetime

from core.settings import QUEUE
from core.settings import DB_URL
from services import IAService


# Configuração do banco de dados
engine = create_engine(DB_URL)
metadata = MetaData()

# Definição da tabela
report_table = Table(
    "report",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("key", String(255), nullable=False),
    Column("description", Text),
    Column("created_at", TIMESTAMP, default=datetime.now),
)

# Função para inserir valores
def insert_report(key: str, description:str):
    with engine.connect() as connection:
        stmt = insert(report_table).values(key=key, description=description)
        result = connection.execute(stmt)
        print(f"Registro inserido com ID: {result.inserted_primary_key[0]}")
        connection.commit()  # Commit após a inserção

def process_message(ch, method, properties, body):
    """
    Processa a mensagem recebida da fila RabbitMQ.

    Args:
        ch: Canal do RabbitMQ.
        method: Método de entrega.
        properties: Propriedades da mensagem.
        body: Corpo da mensagem (conteúdo em bytes).
    """
    print(f"Mensagem recebida com {len(body)} bytes")

    # Salvar a imagem em um arquivo temporário
    with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as temp_file:
        temp_file.write(body)  # Escreve os bytes diretamente no arquivo
        temp_file_path = temp_file.name

    print(f"Imagem salva temporariamente em: {temp_file_path}")

    # Passar o caminho do arquivo para o classificador
    ia_service = IAService()
    result = ia_service.feeling(temp_file_path)
    print(f"Resultado da Análise de sentimentos: {result}")
    insert_report("FEELING", result)

    # Confirma que a mensagem foi processada
    ch.basic_ack(delivery_tag=method.delivery_tag)

def start_consumer():
    """
    Inicia o consumidor para consumir mensagens da fila RabbitMQ.
    """
    print("Iniciando o consumidor...")
    connection = pika.BlockingConnection(pika.ConnectionParameters('queue'))
    channel = connection.channel()

    # Declarar a fila (garantir que ela exista)
    queue_name = QUEUE  # Altere para 'team_queue' se necessário
    channel.queue_declare(queue=queue_name, durable=True)

    # Consumir mensagens da fila
    channel.basic_consume(queue=queue_name, on_message_callback=process_message)

    print(f"Aguardando mensagens na fila '{queue_name}'...")
    channel.start_consuming()

if __name__ == "__main__":
    start_consumer()