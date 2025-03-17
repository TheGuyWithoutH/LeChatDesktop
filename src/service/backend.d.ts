import Chat from "../data/chat";

/**
 * Extend the window object to include the backend API.
 */
declare global {
  interface Window {
    backend: {
      setSettings: (newSettings: UserSettings) => Promise<void>;
      getSettings: (newSettings) => Promise<UserSettings>;
      setChats: (newChats: Chat[]) => Promise<void>;
      getChats: () => Promise<{
        [s: string]: Chat;
      }>;
      setChat: (chat: Chat) => Promise<void>;
      getChat: (id: string) => Promise<Chat>;
      deleteChat: (id: string) => Promise<void>;
      clearChats: () => Promise<void>;
    };
  }
}
