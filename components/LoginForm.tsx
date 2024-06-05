"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import FormInput from "@/components/FormInput";
import { loginFormSchema } from "@/utils/zod/user";
import { signIn } from "next-auth/react";
import type { TLoginFormFields } from "@/utils/zod/user";
import { useRouter } from "next/navigation";
import SubmitButton from "@/components/SubmitButton";

export default function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TLoginFormFields>({ resolver: zodResolver(loginFormSchema) });

  const onSubmit = async (data: TLoginFormFields) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        toast.error(result.error || "an error occurred during the login process");
      } else {
        toast.success("login successful");
        reset();
        router.push("/");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("an error occurred during the login process");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Email"
          type="email"
          name="email"
          id="email"
          placeholder="example@example.com"
          register={register}
          error={errors.email?.message}
        />

        <FormInput
          label="Password"
          type="password"
          name="password"
          id="password"
          placeholder="password"
          register={register}
          error={errors.password?.message}
        />

        <SubmitButton isSubmitting={isSubmitting} text="login" />

        {errors.root && <div className="text-red-700">{errors.root.message}</div>}
      </form>
    </div>
  );
}
