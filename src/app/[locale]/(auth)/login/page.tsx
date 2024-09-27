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
import { Link, useRouter } from '@/libs/next-intl';
import { ROUTES } from '@/routes';
import { Input } from '@/components/shadcn/ui/input';
import { Label } from '@radix-ui/react-label';

export const description =
  "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account.";

const LoginPage = () => {
  const router = useRouter();

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

  return (
    <Card className='mx-auto max-w-sm'>
      <CardHeader>
        <CardTitle className='text-2xl'>Login</CardTitle>
        <CardDescription>Select your login method below</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid gap-4'>
          <div className='grid gap-2'>
            <div className='flex items-center'>
              <Label htmlFor='email'>Email</Label>
              <Link className='ml-auto inline-block text-sm underline' href={ROUTES.REGISTRATION}>
               Register?
              </Link>
            </div>

            <Input
              required
              id='email'
              placeholder='m@example.com'
              type='email'
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='password'>Password</Label>

            <Input required id='password' type='password' />
          </div>
          <Button
            className='w-full'
            type='submit'
            onClick={() => handleCredentialSignIn}
          >
            Login
          </Button>
          <div>
            <Button
              className='w-full'
              variant='outline'
              onClick={() => handleGoogleSignIn()}
            >
              Login with Google
            </Button>
          </div>
        </div>
        <div className='mt-4 text-center text-sm'>
          To use local storage and client store instead,
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
