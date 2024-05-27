"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Toaster, toast } from "sonner";
import FormButton from "@/components/formButton";

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
    formState: { errors, isSubmitting },
  } = useForm<TregisterFormField>({ resolver: zodResolver(registerFormSchema) });

  const onSubmit = async (data: TregisterFormField) => {
    console.log(data);
    try {
      await registerUser(data);
      toast.success("registration successful");
    } catch (error) {
      toast.error("an error occurred during the registration process");
    }
  };

  return (
    <div>
      <Toaster position="bottom-right" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormButton
          label="email"
          type="email"
          name="email"
          id="email"
          placeholder="example@example.com"
          register={register}
          error={errors.email?.message}
        />

        <FormButton
          label="Password"
          type="password"
          name="password"
          id="password"
          placeholder="password"
          register={register}
          error={errors.password?.message}
        />

        <FormButton
          label="Name"
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

        {errors.root && <div className="text-red-700">{errors.root.message}</div>}
      </form>
    </div>
  );
}
