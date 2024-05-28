import type { z } from "zod";
import type { loginFormSchema, registerFormSchema } from "./formSchemas";

export type TRegisterFormFields = z.infer<typeof registerFormSchema>;
export type TLoginFormFields = z.infer<typeof loginFormSchema>;
