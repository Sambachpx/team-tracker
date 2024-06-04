"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster, toast } from "sonner";
import FormInput from "@/components/FormInput";
import { playerFormSchema } from "@/utils/zod/player";
import type { TPlayerFormFields } from "@/utils/zod/player";
import SubmitButton from "@/components/submitButton";
import { useForm } from "react-hook-form";
import useFetchTeams from "./fetchTeams";
import { addPlayer } from "./actions";

export default function PlayerForm() {
  const teams = useFetchTeams();
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
      <Toaster position="bottom-right" richColors />
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
