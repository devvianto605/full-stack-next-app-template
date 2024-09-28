'use client';

import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';

type ClientProviderProps = {
  children: React.ReactNode;
  session?: Session | null; // Optional session prop
};

export const ClientProvider = ({ children, session }: ClientProviderProps) => {
  return (
    <>
      <SessionProvider session={session}>{children}</SessionProvider>
    </>
  );
};
