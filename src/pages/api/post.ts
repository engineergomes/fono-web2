import { PrismaClient } from '@prisma/client';

import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

// async function main() {
//   // ... you will write your Prisma Client queries here
//   const user = await prisma.post.create({
//     data: {
//       title: 'Hello World',
//       content: 'Content',
//     },
//   });
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req;
  console.log('query: ', query);

  switch (method) {
    case 'GET':
      if (query.id) {
        try {
          const blogPost = await prisma.post.findUnique({ where: { id: Number(query.id) } });
          if (!blogPost) throw new Error('Post não existe');
          console.log(blogPost);
          res.status(200).json(blogPost);
        } catch (error) {
          if (error instanceof Error) res.status(404).end(error.message);
        } finally {
          await prisma.$disconnect();
        }
      } else {
        try {
          const blogPosts = await prisma.post.findMany();
          if (blogPosts.length === 0) throw Error('Nenhum post encontrado');
          console.log(blogPosts);
          res.status(200).json(blogPosts);
        } catch (error) {
          if (error instanceof Error) res.status(404).end(error.message);
        } finally {
          await prisma.$disconnect();
        }
      }
      break;

    case 'POST':
      // Tratar POST request
      try {
        const { titulo, conteudo } = body;
        await prisma.post.create({
          data: {
            title: titulo,
            content: conteudo,
          },
        });
        res.status(200).json('Post enviado com sucesso.');
      } catch (error) {
        console.log(error);
      } finally {
        await prisma.$disconnect();
      }
      break;
    case 'PUT':
      try {
        const { id, titulo, conteudo } = body;
        if (!id) throw new Error('ID do post não fornecido');
        await prisma.post.update({
          where: { id: Number(id) },
          data: {
            title: titulo,
            content: conteudo,
          },
        });
        res.status(200).end();
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar o post' });
      } finally {
        await prisma.$disconnect();
      }
      break;

    case 'DELETE':
      try {
        const { id } = body;
        console.log(id);
        await prisma.post.delete({ where: { id: Number(id) } });
        res.status(200);
      } catch (error) {
        console.log(error);
      } finally {
        await prisma.$disconnect();
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'UPDATE', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
