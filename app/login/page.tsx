"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster, toast } from "sonner";
import FormInput from "@/components/FormInput";
import { loginFormSchema } from "@/utils/zod/user";
import { signIn } from "next-auth/react";
import type { TLoginFormFields } from "@/utils/zod/user";
import { useRouter } from "next/navigation";

export default function LoginPage() {
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
      <Toaster position="bottom-right" />
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

        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? "login in progress" : "Login"}
        </button>

        {errors.root && <div className="text-red-700">{errors.root.message}</div>}
      </form>
    </div>
  );
}
