"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Toaster, toast } from "sonner";
import FormInput from "@/components/FormInput";
import { loginFormSchema } from "@/utils/form/formSchemas";
import { signIn } from "next-auth/react";
import type { TLoginFormFields } from "@/utils/form/types";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TLoginFormFields>({ resolver: zodResolver(loginFormSchema) });

  const onSubmit = async (data: TLoginFormFields) => {
    console.log("1ère actions après le submit du formulaire de login");
    try {
      const result = await signIn("credentials", {
        redirect: false, // TODO: change to true
        email: data.email,
        password: data.password,
      });

      console.log("2ème actions sign in result: ", result);

      if (result?.error) {
        setError("root", {
          message: result.error || "an error occurred during the login process",
        });
        toast.error(result.error || "an error occurred during the login process");
      } else {
        toast.success("login successful");
      }
    } catch (error) {
      setError("root", {
        message: "an error occurred during the login process",
      });
      toast.error("an error occurred during the login process");
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
