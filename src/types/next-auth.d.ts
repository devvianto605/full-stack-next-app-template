/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { DefaultSession, DefaultUser } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";

// Extending the NextAuth module
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      isGuest: boolean;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    isGuest: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: string;
      isGuest: boolean;
    } & DefaultJWT;
  }
}
