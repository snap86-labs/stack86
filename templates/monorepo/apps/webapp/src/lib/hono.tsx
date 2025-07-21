import type app from "@stack86/webapi";
import { hc } from "hono/client";

export const honoClient = hc<typeof app>("/");
