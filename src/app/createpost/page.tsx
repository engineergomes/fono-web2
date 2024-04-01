'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';

type Inputs = {
  titulo: string;
  conteudo: string;
};
export default function CreatePost() {
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [preview, setPreview] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  // Definindo o valor inicial do textarea
  useEffect(() => {
    const initialContent = `# Título Principal
## Subtítulo
- Lista
- *Itálico*: *texto*
- **Negrito**: **texto**
- Links: [texto do link](url)
- Imagens: ![texto alternativo](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.FrpUgxPv3Rp4f7nDh5pooAHaFj%26pid%3DApi&f=1&ipt=21317bc2345010adb9fa5fa5a09e58d69b72df484713c2737c2439cf23db9cc5&ipo=images)
- Código: \`console.log('Hello, world!');\`
`;

    setPreview(initialContent);
  }, []);

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

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPreview(e.target.value);
  };

  const markdownStyles = {
    heading1: {
      fontSize: '2rem', // Ajuste conforme necessário
      fontWeight: 'bold',
      marginBottom: '0.5rem',
    },
    heading2: {
      fontSize: '1.5rem', // Ajuste conforme necessário
      fontWeight: 'bold',
      marginBottom: '0.5rem',
    },
  };

  // Restante do código...

  return (
    <div className="max-w-screen-xl mx-auto p-6 bg-white rounded-md shadow-md text-black flex">
      {successMessage && <div className="mb-4 p-3 text-green-800 bg-green-300 rounded-md">{successMessage}</div>}
      <form onSubmit={handleSubmit(onSubmit)} className="flex-grow flex flex-col">
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
          className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 flex-grow"
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
      <div className="flex-grow ml-6">
        <div className="mb-4">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{children}</h2>
              ),
              blockquote: ({ children }) => (
                <blockquote
                  style={{
                    borderLeft: '5px solid #ccc',
                    paddingLeft: '1rem',
                    marginLeft: 0,
                    marginRight: 0,
                    fontStyle: 'italic',
                  }}
                >
                  {children}
                </blockquote>
              ),
              a: ({ children, href }) => (
                <a href={href} style={{ color: 'blue' }}>
                  {children}
                </a>
              ),
              ul: ({ children }) => <ul style={{ listStyleType: 'disc', paddingLeft: '1rem' }}>{children}</ul>,
              li: ({ children }) => <li style={{ marginBottom: '0.5rem' }}>{children}</li>,
            }}
          >
            {preview}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
