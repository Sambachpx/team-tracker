import { z } from "zod";

export const teamFormSchema = z.object({
  name: z.string().min(1, "name is required"),
  players: z.array(z.string()).min(1, "one player is required to create a team"),
});

export type TTeamFormFields = z.infer<typeof teamFormSchema>;
