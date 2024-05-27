import type { UseFormRegister, FieldValues, Path } from "react-hook-form";

interface IFormInputProps<T extends FieldValues> {
  label: string;
  type: "email" | "password" | "text";
  name: Path<T>;
  id: string;
  placeholder: string;
  register: UseFormRegister<T>;
  error?: string;
}

export default function FormInput<T extends FieldValues>({
  type,
  name,
  id,
  placeholder,
  register,
  error,
}: IFormInputProps<T>) {
  return (
    <label htmlFor={id}>
      <input {...register(name)} type={type} id={id} placeholder={placeholder} autoComplete="off" />
      {error && <div className="mt-1 text-red-700">{error}</div>}
    </label>
  );
}
