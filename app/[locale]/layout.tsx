import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Shippori_Mincho_B1, Cormorant_Garamond } from 'next/font/google';
import { routing } from '@/i18n/routing';
import ScrollToTop from '@/components/ScrollToTop';
import SideNav from '@/components/SideNav';
import '../globals.css';

const mincho = Shippori_Mincho_B1({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-mincho',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['300', '400', '500'],
  variable: '--font-cormorant',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ja: '/ja',
        en: '/en',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: locale === 'ja' ? 'ja_JP' : 'en_US',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${mincho.variable} ${cormorant.variable}`}>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
          <SideNav />
          <ScrollToTop />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
