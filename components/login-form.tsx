"use client"
import { cn, TEST_USER } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useActionState } from "react"
import { signIn } from "@/app/actions"
import { LoaderCircle } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [formState, formAction, isPending] = useActionState(signIn, undefined)

  const errorMessage = formState?.error

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  defaultValue={TEST_USER.email}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="********"
                  defaultValue={TEST_USER.password}
                />
              </Field>
              <Field>
                <Button type="submit" disabled={isPending}>
                  {isPending ? (
                    <HugeiconsIcon
                      icon={LoaderCircle}
                      strokeWidth={2}
                      className="h-5 w-5 animate-spin"
                    />
                  ) : (
                    "Login"
                  )}
                </Button>

                {errorMessage ? (
                  <FieldDescription>
                    <p className="text-center text-xs text-red-500">
                      {errorMessage}
                    </p>
                  </FieldDescription>
                ) : null}
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
