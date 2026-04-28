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
          <CardTitle>Inicia sesión en tu cuenta</CardTitle>
          <CardDescription>
            Ingresa tus credenciales para acceder al simulador
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="estudiante@poli.edu.co"
                  required
                  defaultValue={TEST_USER.email}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Contraseña</FieldLabel>
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
                    "Ingresar"
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
