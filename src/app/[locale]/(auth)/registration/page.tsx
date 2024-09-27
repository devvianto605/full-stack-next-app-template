"use client";

import { Button } from "@/shared/components/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/shadcn/ui/card";
import { signIn } from "next-auth/react";
import { useRouter } from "@/libs/next-intl";
import { ROUTES } from "@/routes";

export const description =
  "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account.";

const LoginForm = () => {
  const router = useRouter();

  const handleGuestLogin = async () => {
    const result = await signIn("credentials", {
      redirect: false,
      username: "guest", // Use a designated username for guest login
      password: "guest", // Use a designated password for guest login
    });

    if (result?.error) {
      // eslint-disable-next-line no-console
      console.error("Guest login error: ", result.error);
    } else {
      // eslint-disable-next-line no-console
      console.log("Guest login successful", result);
      router.push(ROUTES.DASHBOARD);
    }
  };

  const handleGoogleSignIn = async () => {
    await signIn("google");
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Select your login method below
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {/* TODO: TD-001 Implement entire flow of credential provider from registration to authentication */}
          {/* <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button
            type="submit"
            className="w-full"
            onClick={undefined}
          >
            Login
          </Button> */}
          <div>
            <Button className="w-full" variant="outline" onClick={() => handleGoogleSignIn()}>
              Login with Google
            </Button>
            <div className="mt-2 text-center text-sm text-red-500">
              * To use the app as full-stack app with google login, database and env are required to be set up.
            </div>
          </div>
        </div>
        <div className="mt-4 text-center text-sm">
          or using local storage and client store instead,
          <div className="underline cursor-pointer font-semibold" onClick={() => handleGuestLogin()}>
            Sign in as a guest.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
export default LoginForm
