from decouple import config


GROQ_API_KEY = config("GROQ_API_KEY")
QUEUE = config("FEELING_QUEUE")
DB_URL = config("DB_URL")