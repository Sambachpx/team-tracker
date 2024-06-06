"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { addPlayer } from "@/app/player/actions";
import { playerFormSchema } from "@/utils/zod/player";
import type { TPlayerFormFields } from "@/utils/zod/player";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "./FormInput";
import SubmitButton from "./SubmitButton";

interface IPlayerFormProps {
  teams: { id: number; name: string; userId: number | null }[];
  player?: TPlayerFormFields;
}

export default function PlayerForm({ teams }: IPlayerFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TPlayerFormFields>({ resolver: zodResolver(playerFormSchema) });

  const onSubmit = async (data: TPlayerFormFields) => {
    try {
      await addPlayer(data);
      toast.success("player added successfully");
      reset();
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

        <SubmitButton isSubmitting={isSubmitting} text="add player" />
      </form>
    </div>
  );
}
/* useEffect(() => {
    if (player) {
      setValue("firstName", player.firstName);
      setValue("lastName", player.lastName);
      setValue("salary", player.salary);
      setValue("team", player.team);
    }
  }, [player, setValue]);
*/
