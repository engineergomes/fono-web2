'use client';

import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services/Services';
import { Summary } from '@/components/Summary';
import { OpenHours } from '@/components/OpenHours/OpenHours';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import { Instagram } from '@/components/Instagram';
import UrlProvider from '@/providers/UrlProvider';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { redirect } from 'next/dist/server/api-utils';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center  scroll-smooth">
      <UrlProvider>
        <Header />
        <Hero />
        <Summary />
        <OpenHours />
        <Instagram />
        <Services />
        <Footer />
      </UrlProvider>
    </main>
  );
}
