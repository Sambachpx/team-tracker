"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, Toaster } from "sonner";
import FormInput from "@/components/FormInput";
import { teamFormSchema } from "@/utils/zod/team";
import type { TTeamFormFields } from "@/utils/zod/team";
import SubmitButton from "@/components/submitButton";
import { authHandler } from "@/auth";
import { addTeam } from "./actions";

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
      const session = await authHandler();
      console.log("session", session);
      const userId = session?.user?.id;
      if (!userId) {
        throw new Error("user not found");
      }
      console.log("user ID:", userId);

      await addTeam({ ...data, userId });
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
      <Toaster position="bottom-right" richColors />
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
