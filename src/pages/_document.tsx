import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html className="scroll-smooth" lang="pt_BR">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="google-site-verification" content="ZNy7erVwghCcVZwbL-LHf8jrA3lckGvcaDNH030MGM8" />
        <script
          id="schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'http://schema.org',
              '@type': 'ProfessionalService',
              name: 'Fono Ana',
              description: 'Fonoaudióloga Ana Nascimento | Jaragua do Sul',
              url: 'https://www.fonoana.com.br/',
              logo: 'https://www.fonoana.com.br/logo-small-nobg.png',
              telephone: '+55 (47) 99777-5008',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'R. Guilherme Dancker',
                addressLocality: 'Jaragua do Sul',
                addressRegion: 'SC',
                postalCode: '89251-460',
                addressCountry: 'BR',
              },
            }),
          }}
        />
      </Head>
      <body className="scroll-smooth w-screen overflow-x-hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
