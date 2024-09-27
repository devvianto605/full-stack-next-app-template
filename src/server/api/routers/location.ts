import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
} from "@/server/api/trpc";
import axios, { AxiosError } from "axios";
import { getLocationIqData } from "@/server/external/location-iq/locationIqService";

export const locationRouter = createTRPCRouter({
    getLocationIqData: publicProcedure.input(z.string()).query(async ({input}) => {
        try {
            const response = await getLocationIqData(input);
            return response.data;
        } catch (error) {
            // Proper error handling
            if (axios.isAxiosError(error)) {
                throw new Error(`Failed to fetch data: ${error.response?.data || error.message}`);
            } else {
                throw new Error(`An unexpected error occurred: ${(error as AxiosError).message}`);
            }
        }
    }),
});
