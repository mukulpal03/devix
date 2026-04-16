import { useMemo } from "react";
import Editor from "@monaco-editor/react";
import { EditorTabs } from "../molecules/EditorTabs";
import { useEditorTabsStore } from "../../store/editorTabsStore";
import { getLanguageFromFileName } from "../../lib/file";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export const PlaygroundEditor = () => {
  const { tabs, activeTabId, setActiveTab, closeTab } = useEditorTabsStore();

  const activeTab = useMemo(
    () => tabs.find((t) => t.id === activeTabId),
    [tabs, activeTabId]
  );

  const activeCode = activeTab?.content ?? "";
  const activeLanguage = getLanguageFromFileName(activeTab?.label ?? "");

  return (
    <Card className="w-full flex flex-col h-full overflow-hidden">
      <CardHeader className="py-3 px-4">
        <CardTitle className="text-lg">Playground</CardTitle>
        <CardDescription className="text-xs">
          Select a file from the explorer to view its contents.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 p-0 flex flex-col overflow-hidden">
        <div className="flex h-full flex-col overflow-hidden border-t">
          {tabs.length > 0 ? (
            <>
              <EditorTabs
                tabs={tabs}
                activeTabId={activeTabId}
                onTabChange={setActiveTab}
                onTabClose={closeTab}
              />
              <div className="flex-1 w-full bg-[#1e1e1e]">
                <Editor
                  language={activeLanguage}
                  value={activeCode}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                  }}
                />
              </div>
            </>
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground bg-[#1e1e1e]">
              No file open. Select a file from the explorer.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
