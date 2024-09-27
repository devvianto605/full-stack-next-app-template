"use client";

type ClientProviderProps = {
  children: React.ReactNode;
};

export const ClientProvider = ({ children }: ClientProviderProps) => {
  return <>{children}</>;
};
