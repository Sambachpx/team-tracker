"use client";

import { addTeam } from "@/app/team/actions";
import type { TTeamFormFields } from "@/utils/zod/team";
import { teamFormSchema } from "@/utils/zod/team";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import FormInput from "./FormInput";
import SubmitButton from "./SubmitButton";

export default function TeamForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TTeamFormFields>({ resolver: zodResolver(teamFormSchema) });

  const onSubmit = async (data: TTeamFormFields) => {
    console.log(data);
    try {
      // TODO: when i pass the suer id in the request the form no longer works

      await addTeam(data);
      toast.success("team added successfully");
      reset();
    } catch (error) {
      if (error instanceof Error) {
        console.error("error adding team:", error);
        toast.error(error.message);
      } else {
        console.error("error adding team:", error);
        toast.error("an error occurred during the team registration process");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          label="Name"
          type="text"
          name="name"
          id="name"
          placeholder="Team Name"
          register={register}
          error={errors.name?.message}
        />

        <SubmitButton isSubmitting={isSubmitting} text="add Team" />
      </form>
    </div>
  );
}
