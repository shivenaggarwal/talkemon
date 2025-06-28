import { polarClient } from "@polar-sh/better-auth";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  plugins: [polarClient()],
}); // could have exported specific auth client options here, but using defaults for now
