import { z } from "zod";

export const playerFormSchema = z.object({
  name: z.string().min(1, "name is required"),
  salary: z.number().min(0, "salary must be a positive number"),
  teamId: z.number().int().positive("teamId must be a positive number"),
});

export type TPlayerFormFields = z.infer<typeof playerFormSchema>;
