import '@/styles/globals.css';

import { GeistSans } from 'geist/font/sans';

import type { Locale } from '@/libs/next-intl';
import { ClientProvider, ServerProvider } from '@/providers/';
import { getServerSession } from 'next-auth';

export const metadata = {
  title: 'Devviantex Full Stack Next App Template',
  description: 'Contributed by Devvianto605',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

type InnerRootLayoutProps = {
  children: React.ReactNode;
  params: { locale: Locale };
};

const InnerRootLayout = async ({
  children,
  params: { locale },
}: InnerRootLayoutProps) => {
  const session = await getServerSession();

  return (
    <html className={`${GeistSans.variable}`} lang={locale}>
      <body>
        <ServerProvider locale={locale}>
          <ClientProvider session={session}>{children}</ClientProvider>
        </ServerProvider>
      </body>
    </html>
  );
};

export default InnerRootLayout;
