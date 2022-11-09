import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { supabase } from "~/utils/supabase";
import { TRPCError } from "@trpc/server";

export const pageRouter = router({
  getAll: publicProcedure.query(async () => {
    const { data, error } = await supabase
      .from("page")
      .select("*")
      .order("created_at", { ascending: true });
    if (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      });
    }
    return data;
  }),
  create: publicProcedure
    .input(
      z.object({
        url: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { data, error } = await supabase.from("page").insert(input);
      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }
      return data;
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        url: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { data, error } = await supabase
        .from("page")
        .update({ url: input.url })
        .eq("id", input.id);
      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }
      return data;
    }),
  toggleRead: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const { data: page, error: pageError } = await supabase
        .from("page")
        .select("read_at")
        .eq("id", input.id)
        .single();

      if (pageError) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: pageError.message,
        });
      }

      const newReadAt = page.read_at ? null : new Date().toUTCString();

      const { data, error } = await supabase
        .from("page")
        .update({ read_at: newReadAt })
        .eq("id", input.id);

      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }

      return data;
    }),
});
