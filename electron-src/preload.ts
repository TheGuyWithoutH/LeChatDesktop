/* eslint-disable @typescript-eslint/no-namespace */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { contextBridge, ipcRenderer } from "electron";
import { IpcRendererEvent } from "electron/main";
import { Chat, UserSettings } from "./store";

// We are using the context bridge to securely expose NodeAPIs.
// Please note that many Node APIs grant access to local system resources.
// Be very cautious about which globals and APIs you expose to untrusted remote content.
contextBridge.exposeInMainWorld("backend", {
  sayHello: () => ipcRenderer.send("message", "hi from next"),
  receiveHello: (handler: (event: IpcRendererEvent, ...args: any[]) => void) =>
    ipcRenderer.on("message", handler),
  stopReceivingHello: (
    handler: (event: IpcRendererEvent, ...args: any[]) => void
  ) => ipcRenderer.removeListener("message", handler),

  // Data API for the renderer process stored in AppData.
  setSettings: async (newSettings: UserSettings) =>
    ipcRenderer.invoke("setSettings", newSettings),
  getSettings: async () => ipcRenderer.invoke("getSettings"),
  setChats: async (newChats: any) => ipcRenderer.invoke("setChats", newChats),
  getChats: async () => ipcRenderer.invoke("getChats"),
  setChat: async (chat: Chat) => ipcRenderer.invoke("setChat", chat),
  getChat: async (id: string) => ipcRenderer.invoke("getChat", id),
  deleteChat: async (chatId: string) =>
    ipcRenderer.invoke("deleteChat", chatId),
  clearChats: async () => ipcRenderer.invoke("clearChats"),

  // IPC API for the window management.
  showMainWindow: (chatId: Chat) =>
    ipcRenderer.invoke("show-main-window", chatId),
  quitApp: () => ipcRenderer.send("app-quit"),
});
