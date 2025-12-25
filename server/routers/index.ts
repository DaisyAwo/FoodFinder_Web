import { z } from "zod";
import {
  publicProcedure,
  protectedProcedure,
  adminProcedure,
  createTRPCRouter,
} from "../trpc";

export const appRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ name: z.string() }).optional())
    .query(({ input }) => {
      return {
        message: `Hello ${input?.name || "World"}!`,
      };
    }),

  healthCheck: publicProcedure.query(() => {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
    };
  }),

  me: protectedProcedure.query(({ ctx }) => {
    return {
      subject: ctx.subject,
    };
  }),

  admin: adminProcedure.query(({ ctx }) => {
    return {
      message: "Admin access granted",
      subject: ctx.subject,
    };
  }),
});

export type AppRouter = typeof appRouter;
