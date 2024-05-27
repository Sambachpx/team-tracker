"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Toaster, toast } from "sonner";
import FormInput from "@/components/FormInput";

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type TLoginFormFields = z.infer<typeof loginFormSchema>;

const loginUser = async (data: TLoginFormFields) => {
  // TODO: call the api to login the user
};

export default function LoginPage() {
  const {
    register, // TODO: change register
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TLoginFormFields>({ resolver: zodResolver(loginFormSchema) });

  const onSubmit = async (data: TLoginFormFields) => {
    console.log(data);
    try {
      await loginUser(data);
      toast.success("login successful");
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
