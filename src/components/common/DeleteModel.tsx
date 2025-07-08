import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {  usePermanentlyDeleteFile } from '@/hooks/useFileData';

interface DeleteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  fileIds: number[];
}

const DeleteModel = ({ open, onOpenChange, fileIds }: DeleteModalProps) => {
  const { deleteFile, isLoading } = usePermanentlyDeleteFile();

  const handleDelete = async () => {
    await deleteFile(fileIds);
    onOpenChange(false); // close modal after deletion
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg">Delete File</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this file? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModel;
