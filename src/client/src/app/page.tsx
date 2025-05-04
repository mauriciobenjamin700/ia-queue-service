"use client";

import { useState, useRef } from "react";

export default function Home() {
  const [classifyImage, setClassifyImage] = useState<File | null>(null);
  const [feelingImage, setFeelingImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [sendCount, setSendCount] = useState(0); // Contador de envios
  const [maxRate, setMaxRate] = useState(1); // Máximo de envios por segundo
  const [isPaused, setIsPaused] = useState(false); // Estado de pausa
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // Referência para o intervalo

  const handleSelectClassifyImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setClassifyImage(event.target.files[0]);
    }
  };

  const handleSelectFeelingImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFeelingImage(event.target.files[0]);
    }
  };

  const sendImages = async () => {
    if (!classifyImage || !feelingImage) {
      setMessage("Por favor, selecione ambas as imagens.");
      return;
    }

    const classifyFormData = new FormData();
    classifyFormData.append("image", classifyImage);

    const feelingFormData = new FormData();
    feelingFormData.append("image", feelingImage);

    try {
      const classifyResponse = await fetch("/api/classify", {
        method: "POST",
        body: classifyFormData,
      });

      const feelingResponse = await fetch("/api/feeling", {
        method: "POST",
        body: feelingFormData,
      });

      if (classifyResponse.ok && feelingResponse.ok) {
        setSendCount((prev) => prev + 1); // Incrementa o contador de envios
        setMessage(`Imagens enviadas com sucesso! Total de envios: ${sendCount + 1}`);
      } else {
        setMessage("Erro ao enviar as imagens.");
      }
    } catch (error) {
      console.error("Erro ao enviar as imagens:", error);
      setMessage("Erro ao enviar as imagens.");
    }
  };

  const startSending = () => {
    if (intervalRef.current) return; // Evita múltiplos intervalos

    setIsUploading(true);
    setMessage("Iniciando envios...");
    intervalRef.current = setInterval(() => {
      if (!isPaused) {
        sendImages();
      }
    }, 1000 / maxRate); // Define o intervalo com base no limite de envios por segundo
  };

  const stopSending = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsUploading(false);
      setMessage("Envios pausados.");
    }
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
    setMessage(isPaused ? "Envios retomados." : "Envios pausados.");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Enviar Imagem para RabbitMQ</h1>
      <form className="flex flex-col items-center gap-4">
        <label htmlFor="classifyImage" className="text-gray-600">
          Selecione uma imagem para classificar:
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleSelectClassifyImage}
          className="border p-2"
        />
        <label htmlFor="feelingImage" className="text-gray-600">
          Selecione uma imagem para analisar:
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleSelectFeelingImage}
          className="border p-2"
        />
        <div className="flex gap-4">
          <button
            type="button"
            onClick={startSending}
            disabled={isUploading}
            className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Iniciar Envios
          </button>
          <button
            type="button"
            onClick={stopSending}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Parar Envios
          </button>
          <button
            type="button"
            onClick={togglePause}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            {isPaused ? "Retomar" : "Pausar"}
          </button>
        </div>
        <div className="flex flex-col items-center mt-4">
          <label htmlFor="maxRate" className="text-gray-600">
            Máximo de envios por segundo:
          </label>
          <input
            type="number"
            id="maxRate"
            value={maxRate}
            onChange={(e) => setMaxRate(Number(e.target.value))}
            className="border p-2 w-20 text-center"
            min="1"
          />
        </div>
      </form>
      <p className="mt-4 text-center">{message}</p>
      <p className="mt-2 text-center">Total de envios: {sendCount}</p>
    </div>
  );
}