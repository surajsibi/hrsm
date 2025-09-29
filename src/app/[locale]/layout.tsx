/* eslint-disable react-refresh/only-export-components */
import { Geist, Geist_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { routing } from '@/i18n/routing';
import RootProvider from '@/provider/root-provider';
import '@/styles/globals.css';

import type { Metadata } from 'next';
import type { JSX, ReactNode } from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}): Promise<JSX.Element> {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const isArabic = locale === 'ar';
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return (
    <html lang={locale} dir={isArabic ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <head>
        <link rel="canonical" href={`https://next-app-i18n-starter.vercel.app`} />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://next-app-i18n-starter.vercel.app"
        />
        <link rel="alternate" hrefLang="en" href="https://next-app-i18n-starter.vercel.app/en" />
        <link rel="alternate" hrefLang="ar" href="https://next-app-i18n-starter.vercel.app/ar" />
        <link rel="alternate" hrefLang="zh" href="https://next-app-i18n-starter.vercel.app/zh" />
        <meta name="keywords" content={t('keywords')} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}

const locales = ['en', 'ar', 'zh'];

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    other: {
      'google-site-verification': 'sVYBYfSJfXdBca3QoqsZtD6lsWVH6sk02RCH4YAbcm8',
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://next-app-i18n-starter.vercel.app`,
      siteName: 'Next.js i18n Boilerplate',
      images: [
        {
          url: 'https://next-app-i18n-starter.vercel.app/og-image.png',
          width: 1200,
          height: 630,
        },
      ],
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['https://next-app-i18n-starter.vercel.app/og-image.png'],
    },
    alternates: {
      canonical: `https://next-app-i18n-starter.vercel.app`,
      languages: {
        en: 'https://next-app-i18n-starter.vercel.app/en',
        ar: 'https://next-app-i18n-starter.vercel.app/ar',
        zh: 'https://next-app-i18n-starter.vercel.app/zh',
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
