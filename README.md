# Atividade 6 – Sistema de Carga com IA embutida nos Consumidores, Containers e RabbitMQ

Crie um sistema distribuído (pode ser em python) em containers que:

- Gere uma carga constante de mensagens,
- Use RabbitMQ como broker de mensagens,
- Consuma essas mensagens em dois serviços consumidores diferentes, cada um com sua própria IA embutida.

## Como deve funcionar (4 containers)

- Gerador de Mensagens:
  - Gera mensagens rápidas para o RabbitMQ (5 mensagens por segundo ou mais).
  - Mensagens são de dois tipos: rosto de uma pessoa ou imagem de um brasão de time de futebol
- RabbitMQ:
  - Armazena as mensagens enviadas.
  - Deve usar Topic no Exchange para mandar para um ou outro consumidor baseado na imagem. Deve-se publicar mensagens com routing keys adequadas (face e team).
- Consumidor 1:
  - Retira mensagens do RabbitMQ.
  - Processa as mensagens com IA 1 (ex.: análise de sentimento, diz se a pessoa está feliz ou triste).
- Consumidor 2:
  - Retira mensagens do RabbitMQ.
  - Processa as mensagens com IA 2 (ex.: identificação de time de futebol).

## Regras Técnicas

- Tudo deve ser conteinerizado (cada serviço em seu container).
- Todos os containers conectados em uma mesma Docker network.
- RabbitMQ deve ter a interface de administração habilitada para monitorar o crescimento da fila.
- Cada consumidor deve processar mais lentamente que a taxa de geração de mensagens, para a fila encher visivelmente.

Postar no SIGAA apenas o link para o projeto no git-hub com o readme bem estruturado.

## Como Executar o Projeto

Obtenha uma Chave de API GROQ [aqui](https://console.groq.com/keys)

Crie um arquivo [.env](.env) na raiz do projeto e adicione sua chave de API GROQ no arquivo `.env`

Exemplo:

```bash
GROQ_API_KEY=YOUR_API_KEY
CLASSIFY_QUEUE=team_queue
FEELING_QUEUE=face_queue
DB_PORT=5432
DB_HOST=report-db
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=postgres
DB_URL=postgresql://postgres:postgres@report-db:5432/postgres
```

Observe que as demais variáveis de ambiente ja estão definidas e devem ser usadas.

Use o comando `docker compose up -d --build` para executar o projeto.

## 📸 Passo a passo: Como enviar as imagens

### 1. Verifique os containers

Certifique-se de que todos os containers Docker estão rodando corretamente.

**Comando:**
```bash
docker ps
```
Caso algum conteiner não tenha subido execute o seguinte comando:

**Subir conteiners**
``` 
  docker compose up <nome-do-conteiner> -d
```
### 2. Abrir o navegado e selecionar imagens

A primeira opção(classificar) é para as imagens relacionas a brasões de times,
enquanto a segunda opção(analisar) é para imagens referentes a análise de pessoas.

**abrir a pagina da ferramenta no navegador**
```
  localhost:8008
```


**abrir a pagina do RabbitMQ no navegador**
```
  localhost:8007
```

### 3 verificar informações salvas no banco de dados
Neste caso tem que ter o o gerenciador de banco de dados DBeaver instalado no seu sistema.
logo abaixo tem as imagens representando o passo a passo como conectar no banco de dados.





