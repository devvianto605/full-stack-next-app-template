'use client';

import { Button } from '@/components/shadcn/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/ui/card';
import { signIn } from 'next-auth/react';
import { useRouter } from '@/libs/next-intl';
import { ROUTES } from '@/routes';
import FormWrapper from '@/components/form/form-wrapper';
import { CustomInput } from '@/components/form/custom-input';
import { z } from 'zod';
import { Separator } from '@/components/shadcn/ui/separator';
import {
  useGetGoogleAvailability,
  useGetCredentialAvailability,
} from '@/hooks/utils/service-availablity';

export const description =
  "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account.";

const LoginPage = () => {
  const router = useRouter();

  const { data: isCredentialsAvailable } = useGetCredentialAvailability();
  const { data: isGoogleAvailable } = useGetGoogleAvailability();

  const handleGuestLogin = async () => {
    const result = await signIn('credentials', {
      redirect: false,
      email: 'guest', // Use a designated username for guest login
      password: 'guest', // Use a designated password for guest login
    });

    if (result?.error) {
      // eslint-disable-next-line no-console
      console.error('Guest login error: ', result.error);
    } else {
      // eslint-disable-next-line no-console
      console.log('Guest login successful', result);
      router.push(ROUTES.DASHBOARD);
    }
  };

  const handleGoogleSignIn = async () => {
    const result = await signIn('google', { callbackUrl: ROUTES.DASHBOARD });

    if (result?.error) {
      // Handle error, show error message to the user
      // setError("Invalid credentials. Please try again.");
    } else {
      // If successful, redirect to the desired page
      router.push(ROUTES.DASHBOARD);
    }
  };

  const handleCredentialSignIn = async (email: string, password: string) => {
    const result = await signIn('credentials', {
      redirect: false, // We control the redirection manually
      email,
      password,
    });

    if (result?.error) {
      // Handle error, show error message to the user
      // setError("Invalid credentials. Please try again.");
    } else {
      // If successful, redirect to the desired page
      router.push(ROUTES.DASHBOARD);
    }
  };

  const loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  type LoginFormType = z.infer<typeof loginFormSchema>;

  // Example of using localized validation schema
  //  const localizedLoginFormSchema =(t: (key: string) => string) =>  z.object({
  //   email: z.string().email(),
  //   password: z.string().min(6, t('translation.key')),
  // });

  // type LocalizedLoginFormType = z.infer<ReturnType<typeof localizedLoginFormSchema>>;

  return (
    <Card className='mx-auto max-w-sm'>
      <CardHeader className='px-8 pb-4'>
        <CardTitle className='text-2xl'>Login</CardTitle>
        <CardDescription>Select your login method below</CardDescription>
      </CardHeader>
      <CardContent>
        <FormWrapper<LoginFormType, typeof loginFormSchema>
          defaultValues={{
            email: 'demo@devvianto605.info',
            password: '12345678',
          }}
          schema={loginFormSchema}
          onSubmit={(form) => handleCredentialSignIn(form.email, form.password)}
        >
          <div className='grid gap-2'>
            <CustomInput
              disabled={!isCredentialsAvailable}
              label='Email'
              name='email'
              placeholder={'m@example.com'}
              type='email'
            />
            <CustomInput
              disabled={!isCredentialsAvailable}
              label='Password'
              name='password'
              type='password'
            />
            <Button
              className='w-full'
              disabled={!isCredentialsAvailable}
              type='submit'
            >
              Login
            </Button>
            <Button
              className='w-full'
              disabled={!isCredentialsAvailable}
              type='button'
              variant='outline'
              onClick={() => router.push(ROUTES.REGISTRATION)}
            >
              Register
            </Button>
          </div>
        </FormWrapper>
        <div className='grid gap-2'>
          <Separator className='my-4' />
          <div>
            <Button
              className='w-full'
              disabled={!isGoogleAvailable}
              variant='outline'
              onClick={() => handleGoogleSignIn()}
            >
              Login with Google
            </Button>
          </div>
          <div className='mt-2 text-center text-sm text-red-500'>
            * To use the app as full-stack app with credential/google auth,
            database and env are required to be set up.
          </div>
        </div>
        <div className='mt-4 text-center text-sm'>
          or use local storage and client store instead,
          <div
            className='underline cursor-pointer font-semibold'
            onClick={() => handleGuestLogin()}
          >
            Login as a guest.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default LoginPage;
