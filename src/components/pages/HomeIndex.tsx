'use client';
import { type JSX } from 'react';

import { Globe } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import LanguageSwitcher from '@/components/LanguageSwitcher';
import { ModeToggle } from '@/components/ModeToggle';

export default function HomeIndex(): JSX.Element {
  const t = useTranslations('Index');

  const f = useTranslations('Footer');
  // const [isRTL, setIsRTL] = useState(false);

  // useEffect(() => {
  //   setIsRTL(document.documentElement.dir === 'rtl');
  // }, []);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b">
        <Link className="flex items-center justify-center" href="#">
          <Globe className="h-6 w-6 m-2 text-primary" />
          <span className="font-bold text-xl">{t('headerName')}</span>
        </Link>
        <nav className="flex gap-4 sm:gap-6">
          <LanguageSwitcher />
          <ModeToggle />
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-8 md:py-12 lg:py-20">
          <div className=" px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  {t('title')}
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  {t('description')}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t justify-between">
        <p className="text-xs text-gray-500 dark:text-gray-400">{f('copyright')}</p>
      </footer>
    </div>
  );
}
