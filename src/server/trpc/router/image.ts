import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { supabase } from "~/utils/supabase";
import { TRPCError } from "@trpc/server";

export const imageRouter = router({
  getAll: publicProcedure.query(async () => {
    const { data, error } = await supabase.storage.from("images").list("kami");
    if (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      });
    }
    return data;
  }),
});
