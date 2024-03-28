'use client';

import { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

type Inputs = {
  titulo: string;
  conteudo: string;
};

export default function CreatePost() {
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    try {
      setSubmitting(true);
      await axios.post('/api/post', data);
      setSuccessMessage('Post enviado com sucesso!');
      reset();
      console.log('Post enviado:', data);
    } catch (error) {
      console.error('Erro ao enviar o post:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      {successMessage && <div className="mb-4 p-3 text-green-800 bg-green-300 rounded-md">{successMessage}</div>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <input
            {...register('titulo', { required: 'Por favor, insira um título.' })}
            placeholder="Título"
            type="text"
            className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
          {errors.titulo && <p className="text-red-500">{errors.titulo.message}</p>}
        </div>
        <div className="mb-4">
          <textarea
            {...register('conteudo', { required: 'Por favor, insira o conteúdo.' })}
            placeholder="Conteúdo"
            className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            rows={5}
          />
          {errors.conteudo && <p className="text-red-500">{errors.conteudo.message}</p>}
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
          disabled={submitting}
        >
          {submitting ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </div>
  );
}
