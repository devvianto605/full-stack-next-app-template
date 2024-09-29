'use client';

/* eslint-disable react/jsx-max-depth */
import { CustomInput } from '@/components/form/custom-input';
import FormWrapper from '@/components/form/form-wrapper';
import { Button } from '@/components/shadcn/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/ui/card';
import { useRegistration } from '@/hooks/auth/registration';
import { Link, useRouter } from '@/libs/next-intl';
import { ROUTES } from '@/routes';
import { signIn } from 'next-auth/react';
import { z } from 'zod';

export const description =
  "A sign up form with first name, last name, email and password inside a card. There's an option to sign up with GitHub and a link to login if you already have an account";

export const RegistrationPage = () => {
  const router = useRouter();
  const { registerAsync } = useRegistration();

  const handleRegistration = async (form: RegistrationFormType) => {
    await registerAsync(
      {
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        password: form.password,
      },
      {
        onSuccess: async () => {
          const result = await signIn('credentials', {
            redirect: false, // We control the redirection manually
            email: form.email,
            password: form.password,
          });

          if (result?.error) {
            // TODO: Add toast
            // Handle error, show error message to the user
            // setError("Invalid credentials. Please try again.");
          } else {
            // If successful, redirect to the desired page
            router.push(ROUTES.DASHBOARD);
          }
        },
        onError: () => {
          // TODO: Add toast
          // Handle error, show error message to the user
          // setError("Invalid credentials. Please try again.");
        },
      },
    );
  };

  const registrationFormSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
  });

  type RegistrationFormType = z.infer<typeof registrationFormSchema>;

  return (
    <Card className='mx-auto max-w-sm'>
      <CardHeader>
        <CardTitle className='text-xl'>Registration</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormWrapper<RegistrationFormType, typeof registrationFormSchema>
          schema={registrationFormSchema}
          onSubmit={handleRegistration}
        >
          <div className='grid'>
            <div className='grid grid-cols-2 gap-4'>
              <CustomInput label='First name' name='firstName' type='text' />
              <CustomInput label='Last name' name='lastName' type='text' />
            </div>
            <CustomInput label='Email' name='email' type='email' />
            <CustomInput label='Password' name='password' type='password' />
            <Button className='w-full' type='submit'>
              Create an account
            </Button>
          </div>
          <div className='mt-4 text-center text-sm'>
            Already have an account?{' '}
            <Link className='underline' href={ROUTES.LOGIN}>
              Login.
            </Link>
          </div>
        </FormWrapper>
      </CardContent>
    </Card>
  );
};
export default RegistrationPage;
