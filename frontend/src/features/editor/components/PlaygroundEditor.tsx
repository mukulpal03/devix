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
      "editor.background": "#0E0E11",
      "editor.foreground": "#EEFFFF",
      "editorLineNumber.foreground": "#3E3D3B",
      "editorLineNumber.activeForeground": "#6E6D6A",
      "editor.lineHighlightBackground": "#ffffff06",
      "editor.selectionBackground": "#5B7FFF33",
      "editor.inactiveSelectionBackground": "#5B7FFF1A",
      "editorCursor.foreground": "#5B7FFF",
      "editor.findMatchBackground": "#5B7FFF44",
      "editorWidget.background": "#111114",
      "editorWidget.border": "#ffffff10",
      "editorSuggestWidget.background": "#111114",
      "editorSuggestWidget.border": "#ffffff10",
      "editorSuggestWidget.selectedBackground": "#5B7FFF20",
      "scrollbar.shadow": "transparent",
      "scrollbarSlider.background": "#ffffff12",
      "scrollbarSlider.hoverBackground": "#ffffff20",
      "tab.activeBackground": "#0E0E11",
      "tab.inactiveBackground": "#0A0A0B",
      "tab.border": "#ffffff08",
      "editorGutter.background": "#0E0E11",
      "minimap.background": "#0E0E11",
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
            <div className="flex h-12 w-12 items-center justify-center rounded-md border border-white/6 bg-white/3">
              <File className="h-5.5 w-5.5 text-text-tertiary" strokeWidth={1.5} />
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
