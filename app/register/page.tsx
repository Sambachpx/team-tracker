"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { Toaster, toast } from "sonner";
import FormInput from "@/components/FormInput";
import { registerFormSchema } from "@/utils/zod/user";
import { useRouter } from "next/navigation";
import { registerUser } from "./actions";

type TRegisterFormFields = z.infer<typeof registerFormSchema>;

export default function RegisterPage() {
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
      <Toaster position="bottom-right" richColors />
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

        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? "registration in progress" : "Register"}
        </button>
      </form>
    </div>
  );
}
