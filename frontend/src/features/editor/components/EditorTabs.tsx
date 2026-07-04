import { type EditorTab } from "@/store/editorTabsStore";
import { FileIcon } from "@/features/editor/components/FileTree/FileIcon";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
      className="scrollbar-hide flex h-9 w-full items-end overflow-x-auto px-0"
      style={{
        backgroundColor: 'var(--surface-elevated)',
        borderBottom: '1px solid var(--border-default-subtle)',
      }}
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
              className="group relative flex h-8 min-w-[120px] max-w-[180px] shrink-0 items-center justify-between gap-2.5 px-3 font-sans text-[13px] transition-colors duration-200 cursor-pointer"
              style={{
                borderRadius: '0px',
                color: isActive ? 'var(--text-heading)' : 'var(--text-body-subtle)',
                borderBottom: isActive ? '2px solid var(--border-brand)' : '2px solid transparent',
                backgroundColor: 'transparent',
                fontWeight: isActive ? 500 : 400,
              }}
            >
              <div className="flex min-w-0 items-center gap-2 overflow-hidden">
                <FileIcon name={tab.label} size={13} />
                <span className="truncate">
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
                  className="flex shrink-0 items-center p-0.5 transition-colors duration-200"
                  style={{
                    borderRadius: '0px',
                    color: isActive ? 'var(--text-body-muted)' : 'transparent',
                    opacity: isActive ? 1 : 0,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-heading)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = isActive ? 'var(--text-body-muted)' : 'transparent'; }}
                >
                  <X size={11} strokeWidth={1.5} />
                </button>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
