import { z } from "zod";

export const formVerifiedEmailZod = z.object({
    uid: z.string().trim().min(26).max(26),
    token: z.string().trim().min(26).max(26),
});