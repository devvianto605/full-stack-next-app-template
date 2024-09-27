/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { DefaultSession } from "next-auth";
import type { DefaultJWT } from "@auth/core/jwt";

declare module "next-auth" {

  // Extend session to hold the access_token
  interface Session extends DefaultSession {
    user: {
      id: string;
      isGuest: boolean;
      // Add more properties if needed
    }
  }

  // Extend token to hold the access_token before it gets put into session
  interface JWT extends DefaultJWT {
    user: {
      id: string;
      isGuest: boolean;
      // Add more properties if needed
    }
  }
}