"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type TloginFormField = z.infer<typeof loginFormSchema>; // change name to TloginFormField

const loginUser = async (data: TloginFormField) => {
  // TODO: call the api to login the user
};

export default function LoginPage() {
  const {
    register, // TODO: change register
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TloginFormField>({ resolver: zodResolver(loginFormSchema) });

  const onSubmit = async (data: TloginFormField) => {
    console.log(data);
    try {
      await loginUser(data);
    } catch (error) {
      setError("root", {
        message: "an error occurred during the login process",
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">
          <input
            {...register("email")}
            type="string"
            name="email"
            id="email"
            placeholder="example@example.com"
            autoComplete="off"
          />
        </label>

        {errors.email && <div className="text-red-700">{errors.email.message}</div>}

        <label htmlFor="password">
          <input
            {...register("password")} // TODO: component for button
            type="string"
            name="password"
            id="password"
            placeholder="password"
            autoComplete="off"
          />
        </label>
        {errors.password && <div className="text-red-700">{errors.password.message}</div>}

        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? "login in progress" : "Login"}
        </button>

        {errors.root && <div className="text-red-700">{errors.root.message}</div>}
      </form>
    </div>
  );
}
