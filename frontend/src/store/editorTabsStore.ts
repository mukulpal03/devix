import { create } from "zustand";

export interface EditorTab {
  id: string;
  label: string;
  content: string;
}

interface EditorTabsStore {
  tabs: EditorTab[];
  activeTabId: string | null;
  addTab: (tab: EditorTab) => void;
  closeTab: (tabId: string) => void;
  setActiveTab: (tabId: string) => void;
  updateTabContent: (tabId: string, content: string) => void;
}

export const useEditorTabsStore = create<EditorTabsStore>((set) => ({
  tabs: [],
  activeTabId: null,
  addTab: (tab) =>
    set((state) => {
      const existingTab = state.tabs.find((t) => t.id === tab.id);
      if (existingTab) {
        return { 
          activeTabId: tab.id,
          tabs: state.tabs.map((t) => (t.id === tab.id ? tab : t))
        };
      }
      return { tabs: [...state.tabs, tab], activeTabId: tab.id };
    }),
  closeTab: (tabId) =>
    set((state) => {
      const newTabs = state.tabs.filter((t) => t.id !== tabId);
      let newActiveTabId = state.activeTabId;
      if (state.activeTabId === tabId) {
        newActiveTabId = newTabs.length > 0 ? newTabs[newTabs.length - 1].id : null;
      }
      return { tabs: newTabs, activeTabId: newActiveTabId };
    }),
  setActiveTab: (tabId) => set({ activeTabId: tabId }),
  updateTabContent: (tabId, content) =>
    set((state) => ({
      tabs: state.tabs.map((tab) =>
        tab.id === tabId ? { ...tab, content } : tab
      ),
    })),
}));
