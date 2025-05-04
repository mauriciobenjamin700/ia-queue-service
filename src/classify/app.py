import uvicorn
import threading
from services.consumer import start_consumer  # Importa o consumidor

def start_api():
    uvicorn.run(
        "api:api",
        host="0.0.0.0",
        port=8000,
        log_level="info",
    )

if __name__ == "__main__":
    # Inicia o consumidor em uma thread separada
    consumer_thread = threading.Thread(target=start_consumer, daemon=True)
    consumer_thread.start()

    # Inicia o servidor FastAPI
    start_api()