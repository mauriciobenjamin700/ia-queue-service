# Use uma imagem base do Python
FROM python:3.11

RUN apt-get update && apt-get upgrade


# Instale as dependências necessárias
RUN pip install pika

# Copie o script para o container
WORKDIR /app
COPY init.py .

# Comando para rodar o script
CMD ["python", "init.py"]