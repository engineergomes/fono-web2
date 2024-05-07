'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';

type Inputs = {
  titulo: string;
  conteudo: string;
};

const initialContent = `# Título Principal
## Subtítulo
- Lista
- *Itálico*: *texto*
- **Negrito**: **texto**
- Links: [texto do link](www.fonoana.com.br)
- Imagens: ![texto alternativo](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.FrpUgxPv3Rp4f7nDh5pooAHaFj%26pid%3DApi&f=1&ipt=21317bc2345010adb9fa5fa5a09e58d69b72df484713c2737c2439cf23db9cc5&ipo=images)
- Código: \`console.log('Hello, world!');\``;

export default function CreatePost() {
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [preview, setPreview] = useState(initialContent);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    setPreview(initialContent);
  }, []);

  const onSubmit = async (data: Inputs) => {
    try {
      setSubmitting(true);
      await axios.post('/api/post', data);
      setSuccessMessage('Post enviado com sucesso!');
      reset(); // Resetando o formulário após o envio
      setPreview(''); // Limpando o texto do textarea
      console.log('Post enviado:', data);
    } catch (error) {
      console.error('Erro ao enviar o post:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPreview(e.target.value);
  };

  return (
    <div className="max-w-screen-2xl mx-auto p-6 bg-white rounded-md shadow-md text-black flex flex-wrap justify-center gap-x-5">
      <div className="w-full mb-4">
        {successMessage && <div className="p-3 text-green-800 bg-green-300 rounded-md">{successMessage}</div>}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-2xl">
        <div className="mb-4">
          <input
            {...register('titulo', { required: 'Por favor, insira um título.' })}
            placeholder="Título"
            type="text"
            className="w-full px-3 py-2 mb-4 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          />
          {errors.titulo && <p className="text-red-500">{errors.titulo.message}</p>}
        </div>
        <textarea
          {...register('conteudo', { required: 'Por favor, insira o conteúdo.' })}
          placeholder="Digite aqui seu conteúdo em Markdown."
          className="w-full px-3 py-2 mb-4 placeholder-gray-400 border lg:min-h-[300px] border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          rows={10}
          value={preview}
          onChange={handleContentChange}
        />
        {errors.conteudo && <p className="text-red-500">{errors.conteudo.message}</p>}
        <button
          type="submit"
          className="mt-4 px-4 py-2 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
          disabled={submitting}
        >
          {submitting ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
      <div className="w-full max-w-xl">
        <div className="mb-4 p-4 border border-gray-300 rounded-md min-h-[380px]">
          <ReactMarkdown
            components={{
              h1: ({ children }) => <h1 className="text-3xl font-bold mb-4">{children}</h1>,
              h2: ({ children }) => <h2 className="text-2xl font-bold mb-4">{children}</h2>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-gray-300 italic pl-4">{children}</blockquote>
              ),
              a: ({ children, href }) => (
                <a href={href} className="text-blue-500">
                  {children}
                </a>
              ),
              ul: ({ children }) => <ul className="list-disc pl-5">{children}</ul>,
              li: ({ children }) => <li className="mb-2">{children}</li>,
            }}
          >
            {preview}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
