import { type EditorTab } from "../../store/editorTabsStore";
import { cn } from "../../lib/utils";
import { FileIcon } from "../atoms/FileIcon";

interface EditorTabsProps {
  tabs: EditorTab[];
  activeTabId: string | null;
  onTabChange: (tabId: string) => void;
}

export const EditorTabs = ({
  tabs,
  activeTabId,
  onTabChange,
}: EditorTabsProps) => (
  <div className="flex items-center gap-1 border-b bg-muted/50 px-2 py-1">
    {tabs.map((tab) => {
      const isActive = tab.id === activeTabId;

      return (
        <button
          key={tab.id}
          type="button"
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "flex items-center gap-2 rounded-sm px-3 py-1.5 text-xs font-medium transition-colors",
            isActive
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:bg-background/60 hover:text-foreground",
          )}
        >
          <FileIcon name={tab.label} size={14} />
          <span>{tab.label}</span>
        </button>
      );
    })}
  </div>
);
