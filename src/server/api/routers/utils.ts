import {
    createTRPCRouter,
    publicProcedure,
} from "@/server/api/trpc";
import { env } from "@/env";

export const utilsRouter = createTRPCRouter({

    isCredentialsAvailable: publicProcedure.query(() => {
        return !!env.DATABASE_URL
    }),

    isGoogleAvailable: publicProcedure.query(() => {
        return !!env.GOOGLE_CLIENT_ID && !!env.GOOGLE_CLIENT_SECRET
    }),
});
