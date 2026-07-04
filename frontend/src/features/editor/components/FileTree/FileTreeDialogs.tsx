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
      case 'rename': return 'Rename Workspace Node';
      case 'createFile': return 'Create Workspace File';
      case 'createFolder': return 'Create Workspace Folder';
      default: return '';
    }
  };

  return (
    <>
      <Dialog open={dialogState.type !== null} onOpenChange={(open) => !open && closeDialogs()}>
        <DialogContent className="sm:max-w-[400px]">
          <form onSubmit={handleDialogSubmit} className="space-y-6">
            <DialogHeader>
              <DialogTitle>
                {getDialogTitle()}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-2">
              <Label htmlFor="name" className="font-mono text-[12px] uppercase tracking-[0.04em] text-[var(--text-body-muted)]">
                Node Name
              </Label>
              <Input
                id="name"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                autoFocus
                placeholder={dialogState.type === 'createFolder' ? 'new-folder' : 'new-file.ts'}
              />
            </div>
            
            <DialogFooter className="gap-2 pt-2">
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={closeDialogs}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                size="sm"
              >
                Confirm
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteNode !== null} onOpenChange={(open) => !open && closeDialogs()}>
        <AlertDialogContent>
          <AlertDialogHeader className="space-y-3">
            <AlertDialogTitle>
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action is destructive and will permanently delete the {deleteNode?.type === 'directory' ? 'folder' : 'file'} "{deleteNode?.name}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 pt-4">
            <AlertDialogCancel
              variant="outline"
              size="sm"
              onClick={closeDialogs}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteSubmit} 
              variant="destructive"
              size="sm"
            >
              Delete Node
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
