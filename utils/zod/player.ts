import { z } from "zod";

export const playerFormSchema = z.object({
  name: z.string().min(1, "name is required"),
  salary: z.coerce.number().min(0, "salary must be a positive number"),
  teamId: z.coerce.number().int().min(1, "team is required"), // TODO: change is not teamId but list of teams
  image: z.string().url("image must be a valid url"),
});

export type TPlayerFormFields = z.infer<typeof playerFormSchema>;
