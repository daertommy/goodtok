/*
 * Copyright (C) 2023 by Fonoster Inc (https://fonoster.com)
 * http://github.com/fonoster/goodtok
 *
 * This file is part of GoodTok
 *
 * Licensed under the MIT License (the "License");
 * you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 *    https://opensource.org/licenses/MIT
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { initTRPC, inferAsyncReturnType } from "@trpc/server";
import { createContext } from "./context";

export type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

// const isAuthed = t.middleware(({ next, ctx }) => {
//   console.log("Checking auth", { ctx });

//   if (!ctx.session?.user?.email) {
//     throw new TRPCError({
//       code: "UNAUTHORIZED"
//     });
//   }
//   return next({
//     ctx: {
//       // Infers the `session` as non-nullable
//       session: ctx.session
//     }
//   });
// });

export const middleware = t.middleware;
export const router = t.router;

/**
 * Public procedures
 **/
export const publicProcedure = t.procedure;

// /**
//  * Protected procedure
//  */
// export const protectedProcedure = t.procedure.use(isAuthed);
