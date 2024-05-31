"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster, toast } from "sonner";
import FormInput from "@/components/FormInput";
import { playerFormSchema } from "@/utils/zod/player";
import type { TPlayerFormFields } from "@/utils/zod/player";
import { addPlayer } from "./actions";

export default function PlayerForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TPlayerFormFields>({ resolver: zodResolver(playerFormSchema) });

  const onSubmit = async (data: TPlayerFormFields) => {
    console.log(data);

    try {
      const player = await addPlayer(data);
      console.log("player added:", player);
      toast.success("player added successfully");
    } catch (error) {
      console.error("error adding player:", error);
      toast.error("an error occurred during the player registration process");
    }
  };

  return (
    <div>
      <Toaster position="bottom-right" />
      <form onSubmit={handleSubmit(onSubmit)}>
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
