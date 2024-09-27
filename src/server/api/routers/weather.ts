import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";
import axios, { AxiosError } from "axios";
import { getOpenWeatherData } from "@/server/external/open-weather/openWeatherService";

export const weatherRouter = createTRPCRouter({
  getOpenWeatherData: publicProcedure.query(async () => {
    try {
      const response = await getOpenWeatherData(); // Specify the type here
      return response.data; // Return the data from the external API
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
