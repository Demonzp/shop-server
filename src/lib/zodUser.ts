import { z } from "zod";

export const formVerifiedEmailZod = z.object({
    uid: z.string().trim().min(24).max(28),
    token: z.string().trim().min(24).max(28),
});