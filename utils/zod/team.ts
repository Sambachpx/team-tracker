import { z } from "zod";

export const teamFormSchema = z.object({
  name: z.string().min(1, "name is required"),
  //  userId: z.string(),
});

export type TTeamFormFields = z.infer<typeof teamFormSchema>;
