/*  <button disabled={isSubmitting} type="submit">
          {isSubmitting ? "adding player..." : "add Player"}
        </button>
        */

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
