"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const registerFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
});

type TregisterFormField = z.infer<typeof registerFormSchema>;

const registerUser = async (data: TregisterFormField) => {
  // TODO: call the api to register the user
};

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TregisterFormField>({ resolver: zodResolver(registerFormSchema) });

  const onSubmit = async (data: TregisterFormField) => {
    console.log(data);
    try {
      await registerUser(data);
    } catch (error) {
      setError("root", {
        message: "an error occurred during the registration process",
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
            {...register("password")}
            type="string"
            name="password"
            id="password"
            placeholder="password"
            autoComplete="off"
          />
        </label>

        {errors.password && <div className="text-red-700">{errors.password.message}</div>}

        <label htmlFor="name">
          <input {...register("name")} type="string" name="name" id="name" placeholder="Samba" autoComplete="off" />
        </label>

        {errors.name && <div className="text-red-700">{errors.name.message}</div>}

        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? "registration in progress" : "Register"}
        </button>

        {errors.root && <div className="text-red-700">{errors.root.message}</div>}
      </form>
    </div>
  );
}
