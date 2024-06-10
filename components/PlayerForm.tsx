"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { addPlayer, updatePlayer } from "@/app/player/actions";
import { playerFormSchema } from "@/utils/zod/player";
import type { TPlayerFormFields } from "@/utils/zod/player";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "./FormInput";
import SubmitButton from "./SubmitButton";

// delete arlet dialog
// qd je select element tableau delete en dehors du tableau (delete 2)

interface IPlayerFormProps {
  teams: { id: number; name: string; userId: number | null }[];
  player?: TPlayerFormFields & { id: number }; // ajout id
}

export default function PlayerForm({ teams, player }: IPlayerFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TPlayerFormFields>({
    resolver: zodResolver(playerFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      salary: 0,
      team: undefined,
      ...player,
    },
  });

  const onSubmit = async (data: TPlayerFormFields) => {
    try {
      if (player) {
        // un seul if doit suffire
        await updatePlayer(player.id, data);
        toast.success("player updated successfully");
      } else {
        await addPlayer(data);
        toast.success("player added successfully");
        reset();
      }
    } catch (error) {
      toast.error("an error occurred during the player registration process");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Name"
          type="text"
          name="firstName"
          id="name"
          placeholder="First Name"
          register={register}
          error={errors.firstName?.message}
        />

        <FormInput
          label="Name"
          type="text"
          name="lastName"
          id="name"
          placeholder="Last Name"
          register={register}
          error={errors.lastName?.message}
        />

        <FormInput
          label="Salary"
          type="number"
          name="salary"
          id="salary"
          placeholder="Salary"
          register={register}
          error={errors.salary?.message}
        />

        <select {...register("team")} name="team" id="team-select">
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>

        <SubmitButton isSubmitting={isSubmitting} text={player ? "update player" : "add player"} />
      </form>
    </div>
  );
}
