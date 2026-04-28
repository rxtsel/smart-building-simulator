"use server"

import { createSession } from "@/lib/session"
import { sleep, TEST_USER } from "@/lib/utils"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type SignInState =
  | {
      error?: string[]
    }
  | undefined

/**
 * Handles the sign-in process.
 *
 * @param _prevState - The previous state (not used in this function).
 * @param formData - The form data containing the user's email and password.
 * @returns An object containing an error message if the sign-in fails, otherwise redirects to the dashboard.
 */
export async function signIn(_prevState: SignInState, formData: FormData) {
  await sleep(1000)

  const { email, password } = Object.fromEntries(formData)

  if (email !== TEST_USER.email || password !== TEST_USER.password) {
    return {
      error: ["Invalid email or password"],
    }
  }

  await createSession({
    userId: crypto.randomUUID(),
  })

  redirect("/dashboard")
}

/**
 * Signs out the user by deleting the session cookie and redirecting to the sign-in page.
 *
 * @returns  A promise that resolves when the sign-out process is complete.
 */
export async function signOut() {
  await sleep(1000)
  ;(await cookies()).delete("session")
  redirect("/")
}
