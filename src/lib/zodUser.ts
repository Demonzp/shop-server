import { z } from "zod";
import { passwordValidation } from "./zodAuth";

export const formVerifiedEmailZod = z.object({
    uid: z.string().trim().min(24).max(28),
    token: z.string().trim().min(24).max(28),
});

export const formChangePassword = z.object({
    password: z
        .string()
        .trim()
        .regex(passwordValidation, {
            message: `Пароль может состоять из латинских символов, цыфр и спецсимволов "@$!%*?&" и должен иметь:
                    - не менее 8 и не более 16 символов
                    - иметь хотябы 1 цыфру 1 маленький символ латиницы 1 большой символ латиницы
                `
        }),
    new_password: z
        .string()
        .trim()
        .regex(passwordValidation, {
            message: `Пароль может состоять из латинских символов, цыфр и спецсимволов "@$!%*?&" и должен иметь:
                        - не менее 8 и не более 16 символов
                        - иметь хотябы 1 цыфру 1 маленький символ латиницы 1 большой символ латиницы
                    `
        }),
});