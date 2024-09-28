/* eslint-disable complexity */
import { PrismaAdapter } from "@auth/prisma-adapter";
import {
  getServerSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "@/env";
import { db } from "@/server/db";
import { createCaller } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 2592000,
  },
  callbacks: {
    async jwt({ token, user }) {
      // If user object is present, add user info to the token
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (user) {
        token.id = user.id;
        token.name = user.name
        token.email = user.email
        token.isGuest = user.isGuest || false; // Set the isGuest flag
      }

      return token;
    },
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.id,
        name: token.name,
        email: token.email,
        isGuest: token.isGuest || false, // Set isGuest flag
      },
    }),
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID || '',
      clientSecret: env.GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter your email" },
        password: { label: "Password", type: "password", placeholder: "Enter your password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) {
            throw new Error("Missing credentials");
        }

        // Check if the credentials indicate a guest signin
        if (credentials.email === "guest" && credentials.password === "guest") {
          // Simulate guest user creation
          const guestUser = {
            id: 'guest-user-id', // Unique identifier for the guest user
            name: 'Guest User',
            email: 'guest@example.com',
            isGuest: true, // Mark user as a guest
          };

          return guestUser; // Return guest user object
        }

        const innerCaller = createCaller(await createTRPCContext({ headers: req.headers as Headers}));

        const data = await innerCaller.auth.signin({
          email: credentials.email,
          password: credentials.password
        })

      if (data.user) {
        return {
          ...data.user,
          isGuest: false
        };
      }

        return null; // Return null if authentication fails
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = async () => await getServerSession(authOptions);
