'use client';

import { signOut, useSession } from "next-auth/react";

const DashboardPage = () => {
  const { data: session } = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <p className="text-7xl font-extrabold tracking-tight">
          Hello, {session?.user.name}
        </p>
        <div className="grid grid-cols-1">
          <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-black/10 p-4 hover:bg-black/20" onClick={() => signOut()}>
            <div className="text-2xl font-bold"> SIGN OUT →</div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
