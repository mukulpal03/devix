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
      className="scrollbar-hide flex h-8 w-full items-end overflow-x-auto border-b border-white/6 bg-bg-primary"
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
                "group relative flex h-8 min-w-[120px] max-w-[180px] shrink-0 items-center justify-between gap-2 border-r border-white/5 px-3 font-heading text-[13px] transition-colors duration-150",
                isActive ? "bg-bg-editor text-text-primary" : "text-text-secondary hover:bg-white/3 hover:text-white/80"
              )}
            >
              <div className="flex min-w-0 items-center gap-1.5 overflow-hidden">
                <FileIcon name={tab.label} size={13} />
                <span className="truncate whitespace-nowrap">
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
                    "flex shrink-0 items-center rounded-sm p-0.5 transition-all duration-100",
                    isActive ? "text-text-secondary opacity-100" : "text-transparent opacity-0 group-hover:text-text-secondary group-hover:opacity-100 hover:bg-white/8 hover:text-text-primary"
                  )}
                >
                  <X size={12} />
                </button>
              )}

              {/* Active Indicator */}
              {isActive && (
                <motion.div
                  layoutId="active-tab-indicator"
                  className="absolute bottom-0 left-0 h-px w-full bg-accent"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
