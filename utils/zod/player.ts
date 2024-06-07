import { z } from "zod";

export const playerFormSchema = z.object({
  firstName: z.string().min(1, "first name is required"),
  lastName: z.string().min(1, "first name is required"),
  salary: z.coerce.number().min(0, "salary must be a positive number"),
  team: z.string().min(1, "team is required"),
  // image: z.string().url("image must be a valid url"),
  id: z.number().optional(),
});

export type TPlayerFormFields = z.infer<typeof playerFormSchema>;
