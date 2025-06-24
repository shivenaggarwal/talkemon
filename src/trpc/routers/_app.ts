import { agentRouter } from "@/modules/agents/server/procedure";

import { createTRPCRouter } from "../init";
export const appRouter = createTRPCRouter({
  agents: agentRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
