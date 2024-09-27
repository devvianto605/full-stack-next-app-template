import { api } from "@/libs/trpc/react";

export function useGetLocationData(query: string) {
  return api.location.getLocationIqData.useQuery(query)
}
