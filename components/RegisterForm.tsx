"use client";

import { toast } from "sonner";
import { registerUser } from "@/app/register/actions";
import { registerFormSchema } from "@/utils/zod/user";
import type { TRegisterFormFields } from "@/utils/zod/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import SubmitButton from "./SubmitButton";
import FormInput from "./FormInput";

export default function PlayerForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TRegisterFormFields>({ resolver: zodResolver(registerFormSchema) });

  const onSubmit = async (data: TRegisterFormFields) => {
    console.log(data);

    try {
      await registerUser(data);
      toast.success("registration successful");
      reset();
      router.push("/login");
    } catch (error) {
      if (error instanceof Error) {
        console.error("error registering user:", error);
        toast.error(error.message);
      } else {
        console.error("an error occurred during the registration process", error);
        toast.error("an error occurred during the registration process");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="email"
          type="email"
          name="email"
          id="email"
          placeholder="example@example.com"
          register={register}
          error={errors.email?.message}
        />

        <FormInput
          label="password"
          type="password"
          name="password"
          id="password"
          placeholder="password"
          register={register}
          error={errors.password?.message}
        />

        <FormInput
          label="name"
          type="text"
          name="name"
          id="name"
          placeholder="Samba"
          register={register}
          error={errors.name?.message}
        />

        <SubmitButton isSubmitting={isSubmitting} text="register" />
      </form>
    </div>
  );
}
