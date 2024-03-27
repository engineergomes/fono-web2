import axios from 'axios';

type BlogParams = {
  params: {
    id: string;
  };
};

export default async function BlogPost({ params }: BlogParams) {
  const response = await axios.get(`http://localhost:3000/api/user?id=${params.id}`);
  const data = await response.data;
  console.log(data);

  if (!data) {
    return <main className="text-black">Página não encontrada</main>;
  }

  return (
    <main className="text-black">
      <h2>{data.title}</h2>
      <p>{data.content}</p>
    </main>
  );
}
