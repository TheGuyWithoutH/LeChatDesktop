import { ipcMain } from "electron";
import { DEFAULT_SETTINGS, STORE_KEYS, SchemaType } from "./store";
import Store from "electron-store";

/**
 * Initialize IPC handlers
 */
const init = (store: Store<SchemaType>) => {
  /**
   * IPC API
   * This is where we use native/server-side platform APIs (like NodeJS modules)
   */
  ipcMain.handle("getSettings", () => {
    checkInitialization();
    return store.get(STORE_KEYS.SETTINGS);
  });

  ipcMain.handle(
    "setSettings",
    async (_, newSettings: Partial<SchemaType["settings"]>) => {
      checkInitialization();
      const prevSettings = store.get(STORE_KEYS.SETTINGS);
      //@ts-ignore
      store.set(STORE_KEYS.SETTINGS, { ...prevSettings, ...newSettings });
    }
  );

  // Get all chats
  ipcMain.handle("getChats", () => {
    checkInitialization();
    return store.get(STORE_KEYS.CHATS);
  });

  // Set all chats
  ipcMain.handle("setChats", async (_, newChats: SchemaType["chats"]) => {
    checkInitialization();
    store.set(STORE_KEYS.CHATS, newChats);
  });

  // Get a specific chat by ID
  ipcMain.handle("getChat", async (_, id: string) => {
    checkInitialization();
    return store.get(STORE_KEYS.CHATS + "." + id);
  });

  // Set a specific chat by ID
  ipcMain.handle("setChat", async (_, chat: any) => {
    checkInitialization();

    const key = STORE_KEYS.CHATS + "." + chat.id;
    store.set(key, chat);
  });

  // Delete a specific chat by ID
  ipcMain.handle("deleteChat", async (_, chatId: string) => {
    // @ts-ignore
    store.delete(STORE_KEYS.CHATS + "." + chatId);
  });

  // Clear all chats
  ipcMain.handle("clearChats", async () => {
    store.set(STORE_KEYS.CHATS, {});
  });

  /**
   * Check if the store has been initialized with the default values.
   * If not, initialize it.
   */
  const checkInitialization = () => {
    if (!store.has(STORE_KEYS.SETTINGS)) {
      store.set(STORE_KEYS.SETTINGS, DEFAULT_SETTINGS);
    }

    if (!store.has(STORE_KEYS.CHATS)) {
      store.set(STORE_KEYS.CHATS, {});
    }
  };
};

export default {
  init,
};
