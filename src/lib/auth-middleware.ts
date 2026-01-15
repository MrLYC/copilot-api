import type { Context, Next } from "hono"

import { state } from "./state"

export async function authMiddleware(
  c: Context,
  next: Next,
): Promise<Response> {
  if (!state.apiKey) {
    await next()
    return c.res
  }

  const authHeader = c.req.header("Authorization")

  if (!authHeader) {
    return c.json({ error: "Missing Authorization header" }, 401)
  }

  const token = authHeader.replace(/^Bearer\s+/i, "")

  if (token !== state.apiKey) {
    return c.json({ error: "Invalid API key" }, 401)
  }

  await next()
  return c.res
}
