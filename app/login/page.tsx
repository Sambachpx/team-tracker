"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type loginFormField = z.infer<typeof loginFormSchema>;

const loginUser = async (data: loginFormField) => {
  //TODO: call the api to login the user
};

export default function LoginPage() {
  const {
    register, //TODO: change register
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<loginFormField>({ resolver: zodResolver(loginFormSchema) });

  const onSubmit = async (data: loginFormField) => {
    console.log(data);
    try {
    } catch (error) {
      setError("root", {
        message: "an error occurred during the login process",
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email"></label>
        <input
          {...register("email")}
          type="string"
          name="email"
          id="email"
          placeholder="example@example.com"
          autoComplete="off"
        />

        {errors.email && <div className="text-red-700">{errors.email.message}</div>}

        <label htmlFor="password"></label>
        <input
          {...register("password")}
          type="string"
          name="password"
          id="password"
          placeholder="password"
          autoComplete="off"
        />

        {errors.password && <div className="text-red-700">{errors.password.message}</div>}

        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? "login in progress" : "Login"}
        </button>

        {errors.root && <div className="text-red-700">{errors.root.message}</div>}
      </form>
    </div>
  );
}
