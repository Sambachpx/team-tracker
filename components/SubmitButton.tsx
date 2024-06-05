interface ISubmitButtonProps {
  isSubmitting: boolean;
  text: string;
}

export default function SubmitButton({ isSubmitting, text }: ISubmitButtonProps) {
  return (
    <button disabled={isSubmitting} type="submit" className="btn">
      {isSubmitting ? "loading..." : text}
    </button>
  );
}
// camel case
