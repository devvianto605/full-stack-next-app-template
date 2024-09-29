import type { Locale } from "@/libs/next-intl";
import { TRPCReactProvider } from "@/libs/trpc/react";
import { NextIntlClientProvider, useMessages } from "next-intl";

type ServerProvider = {
  locale: Locale;
  children: React.ReactNode;
};

export const ServerProvider = ({ children, locale }: ServerProvider) => {
  const messages = useMessages();

  return (
    <>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </NextIntlClientProvider>
    </>
  );
};
