"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster } from "sonner";
import FormInput from "@/components/FormInput";
import { teamFormSchema } from "@/utils/zod/team";
import type { TTeamFormFields } from "@/utils/zod/team";

export default function TeamForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TTeamFormFields>({ resolver: zodResolver(teamFormSchema) });

  const onSubmit = (data: TTeamFormFields) => {
    console.log(data);
  };

  // add toast

  return (
    <div>
      <Toaster position="bottom-right" />
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

        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? "adding team..." : "add Team"}
        </button>
      </form>
    </div>
  );
}
