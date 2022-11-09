import { atom } from "jotai";
import { type Database } from "~/types/supabase";

export const pageAtom = atom<Database["public"]["Tables"]["page"]["Row"]>(
  {} as any
);
