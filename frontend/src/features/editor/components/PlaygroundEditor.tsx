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
      { token: "keyword", foreground: "C792EA" },
      { token: "string", foreground: "C3E88D" },
      { token: "number", foreground: "F78C6C" },
      { token: "comment", foreground: "4A4A6A" },
      { token: "identifier", foreground: "EEFFFF" },
      { token: "type", foreground: "FFCB6B" },
      { token: "delimiter", foreground: "89DDFF" },
      { token: "variable", foreground: "EEFFFF" },
    ],
    colors: {
      "editor.background": "#0C0C12",
      "editor.foreground": "#E8E8ED",
      "editorLineNumber.foreground": "#3A3A50",
      "editorLineNumber.activeForeground": "#6366F1",
      "editor.lineHighlightBackground": "#6366F108",
      "editor.selectionBackground": "#6366F133",
      "editor.inactiveSelectionBackground": "#6366F11A",
      "editorCursor.foreground": "#6366F1",
      "editor.findMatchBackground": "#6366F144",
      "editorWidget.background": "#111118",
      "editorWidget.border": "#ffffff0A",
      "editorSuggestWidget.background": "#111118",
      "editorSuggestWidget.border": "#ffffff0A",
      "editorSuggestWidget.selectedBackground": "#6366F120",
      "scrollbar.shadow": "transparent",
      "scrollbarSlider.background": "#6366F115",
      "scrollbarSlider.hoverBackground": "#6366F125",
      "tab.activeBackground": "#0C0C12",
      "tab.inactiveBackground": "#08080C",
      "tab.border": "#ffffff07",
      "editorGutter.background": "#0C0C12",
      "minimap.background": "#0C0C12",
      "editorStickyScroll.background": "#0C0C12",
      "editorStickyScroll.border": "#ffffff07",
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
    <div className="flex h-full w-full flex-col overflow-hidden bg-bg-editor">
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
                  verticalScrollbarSize: 6,
                  horizontalScrollbarSize: 6,
                },
                overviewRulerBorder: false,
              }}
            />
          </div>
        </>
      ) : (
        <div className="flex h-full items-center justify-center bg-bg-editor">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-accent/15 bg-accent/[0.06]">
              <File className="h-5.5 w-5.5 text-accent/50" strokeWidth={1.5} />
            </div>
            <span className="font-heading text-[13px] text-text-tertiary">
              Select a file from the explorer to begin.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
