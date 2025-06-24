import { Input } from "@/components/ui/input";
import { db } from "@/db";
import { agents } from "@/db/schema";
import { agentInsertSchema } from "@/modules/agents/schemas";
import {
  createTRPCRouter,
  baseProcedure,
  protectedProcedure,
} from "@/trpc/init";
import { z } from "zod";
import { eq } from "drizzle-orm";
// import { TRPCError } from "@trpc/server";

export const agentRouter = createTRPCRouter({
  // change getOne to use protected procedure
  getOne: baseProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const [existingAgent] = await db
        .select()
        .from(agents)
        .where(eq(agents.id, input.id));
      return existingAgent;
    }),

  // change getMany to use protected procedure
  getMany: baseProcedure.query(async () => {
    const data = await db.select().from(agents);

    // await new Promise((resolve) => setTimeout(resolve, 5000));
    // throw new TRPCError({ code: "BAD_REQUEST" });

    return data;
  }),

  create: protectedProcedure
    .input(agentInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const [createdAgent] = await db
        .insert(agents)
        .values({
          ...input,
          user_id: ctx.auth.user.id,
        })
        .returning();

      return createdAgent;
    }),
});
