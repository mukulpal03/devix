import { type EditorTab } from "../../store/editorTabsStore";
import { cn } from "../../lib/utils";
import { FileIcon } from "../atoms/FileIcon";
import { X } from "lucide-react";

interface EditorTabsProps {
  tabs: EditorTab[];
  activeTabId: string | null;
  onTabChange: (tabId: string) => void;
  onTabClose?: (tabId: string) => void;
}

export const EditorTabs = ({
  tabs,
  activeTabId,
  onTabChange,
  onTabClose,
}: EditorTabsProps) => (
  <div className="flex w-full items-center gap-1 overflow-x-auto border-b bg-muted/50 px-2 py-1 scrollbar-hide">
    {tabs.map((tab) => {
      const isActive = tab.id === activeTabId;

      return (
        <div
          key={tab.id}
          role="button"
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "group flex items-center justify-between gap-2 rounded-sm px-3 py-1.5 text-xs font-medium transition-colors min-w-[120px] max-w-[200px] cursor-pointer",
            isActive
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:bg-background/60 hover:text-foreground",
          )}
        >
          <div className="flex items-center gap-2 overflow-hidden">
            <FileIcon name={tab.label} size={14} />
            <span className="truncate">{tab.label}</span>
          </div>
          {onTabClose && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onTabClose(tab.id);
              }}
              className="rounded opacity-0 hover:bg-muted group-hover:opacity-100 transition-opacity p-0.5"
            >
              <X size={12} />
            </button>
          )}
        </div>
      );
    })}
  </div>
);
