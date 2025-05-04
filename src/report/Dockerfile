FROM postgres:17.4

# Set the environment variable for the PostgreSQL user
ENV POSTGRES_USER=postgres
# Set the environment variable for the PostgreSQL password
ENV POSTGRES_PASSWORD=postgres
# Set the environment variable for the PostgreSQL database
ENV POSTGRES_DB=postgres
# Set the environment variable for the PostgreSQL port
ENV POSTGRES_PORT=5432
# Set the environment variable for the PostgreSQL host

COPY ./init.sql /docker-entrypoint-initdb.d/

EXPOSE 5432

CMD ["postgres"]