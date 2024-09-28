'use client'

import { api } from "@/libs/trpc/react";

export const useRegistration = () => {
    const { mutate: register, mutateAsync: registerAsync, ...rest} = api.auth.register.useMutation();

    return { register, registerAsync, ...rest };
};