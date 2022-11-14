import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { imageRouter } from "./image";
import { pageRouter } from "./page";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  page: pageRouter,
  image: imageRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
