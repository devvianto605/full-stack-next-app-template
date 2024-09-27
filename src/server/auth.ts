import { PrismaAdapter } from "@auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import { env } from "@/env";
import { db } from "@/server/db";

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
      if (user) {
        token.id = user.id;
        token.name = user.name
        token.email = user.email
        token.isGuest = user.isGuest || false; // Set the isGuest flag
      }
      return token;
    },
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        name: user.name,
        email: user.email,
        isGuest: user.isGuest || false, // Set isGuest flag
      },
    }),
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Enter your username" },
        password: { label: "Password", type: "password", placeholder: "Enter your password" },
      },
      async authorize(credentials) {
        // Check if the credentials indicate a guest login
        if (credentials?.username === "guest" && credentials?.password === "guest") {
          // Simulate guest user creation
          const guestUser = {
            id: 'guest-user-id', // Unique identifier for the guest user
            name: 'Guest User',
            email: 'guest@example.com',
            isGuest: true, // Mark user as a guest
          };
          return guestUser; // Return guest user object
        }

        // TODO: TD-001 Implement entire flow of credential provider from registration to authentication
        // // Your existing user authentication logic goes here...
        // // For example, lookup user in the database:
        // const user = await db.user.findUnique({
        //   where: { username: credentials.username },
        // });

        // // If user found and password matches, return the user object
        // if (user && (await verifyPassword(credentials.password, user.password))) {
        //   return user;
        // }

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
