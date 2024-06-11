import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/Alert-dialog";
import { Button } from "./ui/Button";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: (confirmed: boolean) => void;
  title: string;
  description: string;
}

export function ConfirmationDialog({ isOpen, onClose, title, description }: ConfirmationDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onClose(false)}>Cancel</AlertDialogCancel>
          <Button onClick={() => onClose(true)} className="btn-confirm">
            Confirm
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// remonter fonction qui permet de cocher

// peut etre fonctions props au tabeau qui permet de cocher

/* interface DeleteConfirmationDialogProps {
  title: string;
  description: string;
  buttonText: string;
  onConfirm: () => Promise<void>;
}

export default function DeleteConfirmationDialog({
  title,
  description,
  buttonText,
  onConfirm,
}: DeleteConfirmationDialogProps) {
  const handleConfirm = async () => {
    await onConfirm();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>{buttonText}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
*/
