# Config

## 2. Configurar o Exchange e as Filas

No RabbitMQ, você precisa criar um Topic Exchange e configurar as filas para os consumidores. Isso pode ser feito programaticamente ou pela interface de administração.

### 2.1. Criar o Exchange

- Acesse a interface de administração em <http://localhost:8008> (usuário: guest, senha: guest).
- Vá até a aba Exchanges.
- Clique em Add a new exchange:
- Name: image_topic_exchange
- Type: topic
- Durability: Durable
- Clique em Add exchange.

### 2.2. Criar as Filas

- Vá até a aba Queues.
- Clique em Add a new queue para cada consumidor:
- Queue 1:
  - Name: face_queue
  - Durability: Durable
- Queue 2:
  - Name: team_queue
  - Durability: Durable
