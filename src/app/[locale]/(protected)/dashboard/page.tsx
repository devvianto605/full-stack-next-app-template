'use client';

import { signOut } from "next-auth/react";

const DashboardPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#1e3a8a] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          DASHBOARD PAGE
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20">
            <h3 className="text-2xl font-bold">Lorem ipsum →</h3>
            <div className="text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              viverra turpis ut sapien fermentum, et tempus ipsum interdum.
            </div>
          </div>
          <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20">
            <h3 className="text-2xl font-bold">Lorem Yibsom →</h3>
            <div className="text-lg" onClick={() => signOut()}>
              SIGN OUT
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
