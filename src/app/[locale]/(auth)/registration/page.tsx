import { Button } from "@/components/shadcn/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/ui/card"
import { Input } from "@/components/shadcn/ui/input"
import { Label } from "@/components/shadcn/ui/label"
import { Link } from "@/libs/next-intl"
import { ROUTES } from "@/routes"

export const description =
  "A sign up form with first name, last name, email and password inside a card. There's an option to sign up with GitHub and a link to login if you already have an account"

export const RegistrationPage = () => {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Registration</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">First name</Label>
              <Input required id="first-name" placeholder="Max" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input required id="last-name" placeholder="Robinson" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              required
              id="email"
              placeholder="m@example.com"
              type="email"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" />
          </div>
          <Button className="w-full" type="submit">
            Create an account
          </Button>
          <Button className="w-full" variant="outline">
            Sign up with GitHub
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link className="underline" href={ROUTES.LOGIN}>
            Login.
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
export default RegistrationPage