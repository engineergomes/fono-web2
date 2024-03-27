'use client';

import { useState } from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  titulo: string;
  conteudo: string;
};

export default function CreatePost() {
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = async (e: any) => {
    e.preventDefault();
    await axios.post('/api/user', { titulo, conteudo });
    const dados = e.target;
    console.log(titulo, conteudo);
  };

  return (
    <form className="flex flex-col max-w-xl gap-4 mx-auto text-black" onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('titulo', { required: true })}
        placeholder="Título"
        type="text"
        className="border border-black"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <input
        {...register('conteudo', { required: true })}
        placeholder="Conteúdo"
        type="textarea"
        className="border border-black  h-72"
        value={conteudo}
        onChange={(e) => setConteudo(e.target.value)}
      />
      <button type="submit" className="text-black" onClick={(e) => onSubmit(e)}>
        Enviar
      </button>
    </form>
  );
}
