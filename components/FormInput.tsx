import type { UseFormRegister, FieldValues, Path } from "react-hook-form";
import { cn } from "@/lib/utils";

interface IFormInputProps<T extends FieldValues> {
  label: string;
  type: "email" | "number" | "password" | "text";
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
      <input
        {...register(name)}
        type={type}
        id={id}
        placeholder={placeholder}
        autoComplete="off"
        className={cn("p2- border-gray-400 rounded text-lg")}
      />
      {error && <div className="mt-1 text-red-700">{error}</div>}
    </label>
  );
}
