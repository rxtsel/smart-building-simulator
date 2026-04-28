import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { decryptSession } from "./lib/session"

const PROTECTED_ROUTES = ["/dashboard"]
const PUBLIC_ROUTES = ["/"]

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = PROTECTED_ROUTES.includes(path)
  const isPublicRoute = PUBLIC_ROUTES.includes(path)

  const cookie = (await cookies()).get("session")?.value
  const session = await decryptSession(cookie)

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/", req.nextUrl).toString())
  }

  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl).toString())
  }

  return NextResponse.next()
}
