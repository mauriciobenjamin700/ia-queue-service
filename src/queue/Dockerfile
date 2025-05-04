FROM rabbitmq:4.1.0-management

# Configurar as variáveis de ambiente para o RabbitMQ
ENV RABBITMQ_DEFAULT_USER=guest
ENV RABBITMQ_DEFAULT_PASS=guest

# 5672: Porta para comunicação com o RabbitMQ
# 15672: Porta para a interface de administração
EXPOSE 5672 15672

# Comando padrão para iniciar o RabbitMQ
CMD ["rabbitmq-server"]