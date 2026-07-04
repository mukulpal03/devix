import { useMemo, useRef, useEffect } from "react";
import Editor, { loader } from "@monaco-editor/react";
import { EditorTabs } from "./EditorTabs";
import { useEditorTabsStore } from "@/store/editorTabsStore";
import { editorSocket } from "@/lib/socket";
import { getLanguageFromFileName } from "@/lib/file";
import { File } from "lucide-react";

loader.init().then((monaco) => {
  monaco.editor.defineTheme("devix-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "keyword", foreground: "569CD6" },
      { token: "string", foreground: "CE9178" },
      { token: "number", foreground: "B5CEA8" },
      { token: "comment", foreground: "6A9955" },
      { token: "identifier", foreground: "9CDCFE" },
      { token: "type", foreground: "4EC9B0" },
      { token: "delimiter", foreground: "D4D4D4" },
      { token: "variable", foreground: "9CDCFE" },
    ],
    colors: {
      "editor.background": "#1E1E1E",
      "editor.foreground": "#D4D4D4",
      "editorLineNumber.foreground": "#858585",
      "editorLineNumber.activeForeground": "#C6C6C6",
      "editor.lineHighlightBackground": "#2F313433",
      "editor.selectionBackground": "#264F78",
      "editor.inactiveSelectionBackground": "#3A3D41",
      "editorCursor.foreground": "#AEAFAD",
      "editor.findMatchBackground": "#515C6A",
      "editorWidget.background": "#252526",
      "editorWidget.border": "#454545",
      "editorSuggestWidget.background": "#252526",
      "editorSuggestWidget.border": "#454545",
      "editorSuggestWidget.selectedBackground": "#073E6C",
      "scrollbar.shadow": "#00000000",
      "scrollbarSlider.background": "#79797940",
      "scrollbarSlider.hoverBackground": "#79797964",
      "tab.activeBackground": "#1E1E1E",
      "tab.inactiveBackground": "#2D2D2D",
      "tab.border": "#252526",
      "editorGutter.background": "#1E1E1E",
      "minimap.background": "#1E1E1E",
      "editorStickyScroll.background": "#1E1E1E",
      "editorStickyScroll.border": "#2D2D2D",
      "editorStickyScroll.shadow": "#00000000",
    },
  });
});

export const PlaygroundEditor = () => {
  const { tabs, activeTabId, setActiveTab, closeTab, updateTabContent } =
    useEditorTabsStore();

  const activeTab = useMemo(
    () => tabs.find((t) => t.id === activeTabId),
    [tabs, activeTabId],
  );

  const activeCode = activeTab?.content ?? "";
  const activeLanguage = getLanguageFromFileName(activeTab?.label ?? "");

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleEditorChange = (value: string | undefined) => {
    if (value === undefined || !activeTab) return;

    updateTabContent(activeTab.id, value);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      editorSocket.emit("writeFile", {
        pathToFileOrDir: activeTab.id,
        data: value,
      });
    }, 1000);
  };

  return (
    <div className="flex h-full w-full flex-col overflow-hidden" style={{ backgroundColor: 'var(--surface-page-base)' }}>
      {tabs.length > 0 ? (
        <>
          <EditorTabs
            tabs={tabs}
            activeTabId={activeTabId}
            onTabChange={setActiveTab}
            onTabClose={closeTab}
          />
          <div className="relative flex-1 w-full">
            <Editor
              language={activeLanguage}
              value={activeCode}
              theme="devix-dark"
              onChange={handleEditorChange}
              options={{
                minimap: { enabled: false },
                fontSize: 13,
                fontFamily:
                  "'JetBrains Mono', 'Fira Code', 'Menlo', 'Monaco', monospace",
                fontLigatures: true,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                padding: { top: 16, bottom: 16 },
                lineHeight: 20.8,
                cursorStyle: "line",
                cursorWidth: 2,
                renderLineHighlight: "all",
                lineNumbersMinChars: 4,
                glyphMargin: false,
                folding: true,
                scrollbar: {
                  verticalScrollbarSize: 5,
                  horizontalScrollbarSize: 5,
                },
                overviewRulerBorder: false,
              }}
            />
          </div>
        </>
      ) : (
        <div
          className="flex h-full items-center justify-center"
          style={{ backgroundColor: 'var(--surface-page-base)' }}
        >
          <div className="flex flex-col items-center gap-4 text-center">
            {/* Square icon container — 0px radius */}
            <div
              className="flex h-12 w-12 items-center justify-center"
              style={{
                backgroundColor: 'var(--surface-warm-card)',
                borderRadius: '0px',
                border: 'none',
                boxShadow: 'none',
              }}
            >
              <File className="h-5 w-5" strokeWidth={1.5} style={{ color: 'var(--text-heading)' }} />
            </div>
            <span
              className="font-sans text-[14px] max-w-[200px]"
              style={{ color: 'var(--text-body-subtle)' }}
            >
              Select a file from the explorer to begin writing code.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
