import Container from '../Container';

export function BlogHero() {
  return (
    <section className="bg-gradient-to-r from-lightBlue to-lightPurple w-full py-20 pt-32">
      <Container className="px-4">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Blog</h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Artigos, dicas e informações sobre fonoaudiologia, desenvolvimento infantil e muito mais para ajudar você e
            sua família.
          </p>
        </div>
      </Container>
    </section>
  );
}
