import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { DirectoryNode } from "@/types/project";

export type DialogType = 'rename' | 'createFile' | 'createFolder' | null;

interface FileTreeDialogsProps {
  dialogState: { type: DialogType; node: DirectoryNode | null };
  deleteNode: DirectoryNode | null;
  inputValue: string;
  setInputValue: (val: string) => void;
  closeDialogs: () => void;
  handleDialogSubmit: (e: React.FormEvent) => void;
  handleDeleteSubmit: () => void;
}

export const FileTreeDialogs = ({
  dialogState,
  deleteNode,
  inputValue,
  setInputValue,
  closeDialogs,
  handleDialogSubmit,
  handleDeleteSubmit,
}: FileTreeDialogsProps) => {
  const getDialogTitle = () => {
    switch (dialogState.type) {
      case 'rename': return 'Rename';
      case 'createFile': return 'New File';
      case 'createFolder': return 'New Folder';
      default: return '';
    }
  };

  return (
    <>
      <Dialog open={dialogState.type !== null} onOpenChange={(open) => !open && closeDialogs()}>
        <DialogContent className="sm:max-w-[425px] bg-bg-elevated border-white/10 text-text-primary">
          <form onSubmit={handleDialogSubmit}>
            <DialogHeader>
              <DialogTitle className="font-heading text-lg font-medium text-text-primary">
                {getDialogTitle()}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-6">
              <div className="grid gap-2">
                <Label htmlFor="name" className="font-heading text-xs uppercase tracking-widest text-text-secondary">
                  Name
                </Label>
                <Input
                  id="name"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  autoFocus
                  className="h-9 bg-bg-primary border-white/8 text-sm focus:ring-accent/50"
                  placeholder={dialogState.type === 'createFolder' ? 'new-folder' : 'new-file.ts'}
                />
              </div>
            </div>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button 
                type="button" 
                variant="outline" 
                onClick={closeDialogs}
                className="h-9 rounded-[4px] border-white/6 bg-transparent text-text-secondary hover:bg-white/4 hover:text-text-primary"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="h-9 rounded-[4px] bg-accent text-white hover:opacity-90 border-none"
              >
                Confirm
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteNode !== null} onOpenChange={(open) => !open && closeDialogs()}>
        <AlertDialogContent className="bg-bg-elevated border-white/10 text-text-primary">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-heading text-lg font-medium text-text-primary">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="font-heading text-sm text-text-secondary">
              This will permanently delete the {deleteNode?.type === 'directory' ? 'folder' : 'file'} "{deleteNode?.name}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:gap-0">
            <AlertDialogCancel className="h-9 rounded-[4px] border-white/6 bg-transparent text-text-secondary hover:bg-white/4 hover:text-text-primary">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteSubmit} 
              className="h-9 rounded-[4px] bg-error text-white hover:bg-error/90 border-none px-6"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
