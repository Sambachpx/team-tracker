import { z } from "zod";

export const playerFormSchema = z.object({
  name: z.string().min(1, "name is required"),
  salary: z.string().min(0, "salary must be a positive number"),
  teamId: z.string().min(1, "team is required"),
  image: z.string().url("image must be a valid url"),
});

export type TPlayerFormFields = z.infer<typeof playerFormSchema>;
