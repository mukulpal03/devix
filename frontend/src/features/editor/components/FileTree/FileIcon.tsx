import {
  FileIcon as SymbolFileIcon,
  FolderIcon as SymbolFolderIcon,
} from "@react-symbols/icons/utils";
import { cn } from "@/lib/utils";

interface FileIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const FileIcon = ({ name, className, size = 16 }: FileIconProps) => {
  return (
    <div
      className={cn("flex items-center justify-center shrink-0 opacity-90", className)}
      style={{ width: size, height: size }}
    >
      <SymbolFileIcon fileName={name} autoAssign />
    </div>
  );
};

interface FolderIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const FolderIcon = ({ name, className, size = 16 }: FolderIconProps) => {
  return (
    <div
      className={cn("flex items-center justify-center shrink-0 opacity-80", className)}
      style={{ width: size, height: size }}
    >
      <SymbolFolderIcon folderName={name} />
    </div>
  );
};
