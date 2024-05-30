"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster, toast } from "sonner";
import FormInput from "@/components/FormInput";
import { playerFormSchema } from "@/utils/zod/player";
import type { TPlayerFormFields } from "@/utils/zod/player";
// import { addPlayer } from "./actions"; //TODO: uncomment this line after implementing the addPlayer function

export default function PlayerForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TPlayerFormFields>({ resolver: zodResolver(playerFormSchema) });

  const onSubmit = (data: TPlayerFormFields) => {
    console.log(data);
    try {
      //  await addPlayer(data);
      toast.success("Player added successfully");
      reset();
    } catch (error) {
      toast.error("An error occurred during the player registration process");
    }
  };

  return (
    <div>
      <Toaster position="bottom-right" />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          label="Name"
          type="text"
          name="name"
          id="name"
          placeholder="Player Name"
          register={register}
          error={errors.name?.message}
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

        <FormInput
          label="Team ID"
          type="number"
          name="teamId"
          id="teamId"
          placeholder="Team ID"
          register={register}
          error={errors.teamId?.message}
        />

        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? "adding player..." : "add Player"}
        </button>
      </form>
    </div>
  );
}
