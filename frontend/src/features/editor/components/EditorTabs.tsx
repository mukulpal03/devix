import { type EditorTab } from "@/store/editorTabsStore";
import { FileIcon } from "@/features/editor/components/FileTree/FileIcon";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

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
}: EditorTabsProps) => {
  return (
    <div
      className="scrollbar-hide flex h-9 w-full items-end overflow-x-auto border-b border-white/[0.04] bg-bg-deep px-2"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;

          return (
            <motion.div
              layout
              key={tab.id}
              role="button"
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "group relative flex h-8 min-w-[120px] max-w-[180px] shrink-0 items-center justify-between gap-2.5 rounded-t-lg border-x border-t border-transparent px-3 font-heading text-[12px] transition-all duration-300",
                isActive
                  ? "border-white/[0.04] bg-bg-primary text-text-primary shadow-[0_-4px_12px_rgba(0,0,0,0.2)]"
                  : "text-text-secondary hover:bg-white/[0.02] hover:text-text-primary"
              )}
            >
              <div className="flex min-w-0 items-center gap-2 overflow-hidden">
                <FileIcon name={tab.label} size={13} />
                <span className="truncate font-medium">
                  {tab.label}
                </span>
              </div>

              {onTabClose && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onTabClose(tab.id);
                  }}
                  className={cn(
                    "flex shrink-0 items-center rounded p-0.5 transition-all duration-300",
                    isActive
                      ? "text-text-secondary hover:bg-white/[0.05] hover:text-text-primary"
                      : "text-transparent opacity-0 group-hover:text-text-secondary group-hover:opacity-100 hover:bg-white/[0.05] hover:text-text-primary"
                  )}
                >
                  <X size={11} />
                </button>
              )}

              {/* Active indicator bar */}
              {isActive && (
                <motion.div
                  layoutId="active-tab-indicator"
                  className="absolute -bottom-[1px] left-[10%] h-[1.5px] w-[80%] bg-accent"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
