'use client';

// Convention: The file name should follow 'useSomethingQueries
import { api } from '@/libs/trpc/react';

export const useGetCredentialAvailability = () => {
  return api.utils.isCredentialsAvailable.useQuery();
}

export const useGetGoogleAvailability = () => {
return api.utils.isGoogleAvailable.useQuery();
};