"use client";

import { useState } from "react";

export default function Home() {
  const [classifyImage, setClassifyImage] = useState<File | null>(null);
  const [feelingImage, setFeelingImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!feelingImage) {
      setMessage("Por favor, selecione uma imagem para analisar.");
      return;
    }
    if (!classifyImage) {
      setMessage("Por favor, selecione uma imagem para classificar.");
      return;
    }

    setIsUploading(true);
    setMessage("");

    const classifyFormData = new FormData();
    classifyFormData.append("image", feelingImage);

    try {
      const response = await fetch("/api/classify", {
        method: "POST",
        body: classifyFormData,
      });

      if (response.ok) {
        setMessage("Imagem enviada com sucesso para a fila!");
      } else {
        const errorData = await response.json();
        setMessage(`Erro: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Erro ao enviar a imagem:", error);
      setMessage("Erro ao enviar a imagem.");
    }

    const feelingFormData = new FormData();
    feelingFormData.append("image", feelingImage);

    try {
      const response = await fetch("/api/feeling", {
        method: "POST",
        body: feelingFormData,
      });

      if (response.ok) {
        setMessage("Imagem enviada com sucesso para a fila!");
      } else {
        const errorData = await response.json();
        setMessage(`Erro: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Erro ao enviar a imagem:", error);
      setMessage("Erro ao enviar a imagem.");
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Enviar Imagem para RabbitMQ</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
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
          placeholder="Selecione uma imagem para analisar"
        />
        <button
          type="submit"
          disabled={isUploading}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {isUploading ? "Enviando..." : "Enviar"}
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}