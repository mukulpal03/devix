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
        <DialogContent className="sm:max-w-[400px] bg-bg-secondary border border-white/[0.04] text-text-primary rounded-2xl p-6 shadow-[0_24px_64px_rgba(0,0,0,0.6)]">
          <form onSubmit={handleDialogSubmit} className="space-y-6">
            <DialogHeader>
              <DialogTitle className="font-display text-lg font-bold text-text-primary tracking-tight">
                {getDialogTitle()}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-2">
              <Label htmlFor="name" className="font-heading text-[10px] font-semibold uppercase tracking-[0.16em] text-text-secondary">
                Node Name
              </Label>
              <Input
                id="name"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                autoFocus
                className="h-10 bg-bg-primary border border-white/[0.04] text-sm focus:border-accent/30 focus:ring-accent-glow rounded-xl font-heading font-medium tracking-tight text-text-primary"
                placeholder={dialogState.type === 'createFolder' ? 'new-folder' : 'new-file.ts'}
              />
            </div>
            
            <DialogFooter className="gap-2 sm:gap-0 pt-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={closeDialogs}
                className="h-10 rounded-full border border-white/[0.05] bg-transparent text-text-secondary hover:bg-white/[0.02] hover:text-text-primary px-5 text-xs font-semibold"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="h-10 rounded-full bg-accent text-white hover:bg-accent/90 border-none px-6 text-xs font-semibold shadow-[0_0_24px_rgba(16,185,129,0.15)] transition-all duration-300 hover:shadow-[0_0_32px_rgba(16,185,129,0.25)]"
              >
                Confirm
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteNode !== null} onOpenChange={(open) => !open && closeDialogs()}>
        <AlertDialogContent className="bg-bg-secondary border border-white/[0.04] text-text-primary rounded-2xl p-6 shadow-[0_24px_64px_rgba(0,0,0,0.6)]">
          <AlertDialogHeader className="space-y-3">
            <AlertDialogTitle className="font-display text-lg font-bold text-text-primary tracking-tight">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="font-heading text-sm text-text-secondary leading-relaxed">
              This action is destructive and will permanently delete the {deleteNode?.type === 'directory' ? 'folder' : 'file'} "{deleteNode?.name}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:gap-0 pt-4">
            <AlertDialogCancel className="h-10 rounded-full border border-white/[0.05] bg-transparent text-text-secondary hover:bg-white/[0.02] hover:text-text-primary px-5 text-xs font-semibold">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteSubmit} 
              className="h-10 rounded-full bg-error text-white hover:bg-error/90 border-none px-6 text-xs font-semibold shadow-[0_0_24px_rgba(239,68,68,0.15)] transition-all duration-300 hover:shadow-[0_0_32px_rgba(239,68,68,0.25)]"
            >
              Delete Node
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
