// Native
import { join } from "path";
import { format } from "url";

// Packages
import {
  BrowserWindow,
  app,
  ipcMain,
  IpcMainEvent,
  globalShortcut,
} from "electron";
import isDev from "electron-is-dev";
import prepareNext from "electron-next";
import ipc from "./ipc";
import { SchemaType } from "./store";
import Store from "electron-store";

// Initialize IPC handlers and store
const store = new Store<SchemaType>();
ipc.init(store);

let mainWindow: BrowserWindow | null = null;

// Helper to create the main window
function createMainWindow(icon: string): BrowserWindow {
  const win = new BrowserWindow({
    width: 1080,
    height: 720,
    center: true,
    icon,
    webPreferences: {
      nodeIntegration: false,
      sandbox: false,
      contextIsolation: true,
      preload: join(__dirname, "preload.js"),
    },
  });
  win.on("close", () => {
    mainWindow = null;
  });
  return win;
}

// Helper to create the search bar window
function createSearchBarWindow(): BrowserWindow {
  return new BrowserWindow({
    width: 610,
    height: 680,
    frame: false,
    transparent: true,
    resizable: false,
    show: false,
    backgroundColor: "#00000000",
    alwaysOnTop: true,
    hasShadow: false,
    webPreferences: {
      nodeIntegration: false,
      sandbox: false,
      contextIsolation: true,
      preload: join(__dirname, "preload.js"),
    },
  });
}

app.on("ready", async () => {
  await prepareNext("./");

  const icon = join(__dirname, "../public/mistral.png");

  // Create main and search windows
  mainWindow = createMainWindow(icon);
  const searchBarWindow = createSearchBarWindow();

  // Define URLs based on environment
  const mainUrl = isDev
    ? "http://localhost:8000"
    : format({
        pathname: join(__dirname, "out/index.html"),
        protocol: "file:",
        slashes: true,
      });

  const searchUrl = isDev
    ? "http://localhost:8000/quick-search"
    : format({
        pathname: join(__dirname, "out/index.html/quick-search"),
        protocol: "file:",
        slashes: true,
      });

  // Global shortcut for toggling search window visibility
  globalShortcut.register("CommandOrControl+Shift+I", () => {
    if (searchBarWindow.isVisible()) {
      searchBarWindow.hide();
    } else {
      searchBarWindow.show();
    }
  });

  // IPC handler to show the main window with an optional chatId
  ipcMain.handle("show-main-window", async (_, chatId: string) => {
    searchBarWindow.hide();

    if (!mainWindow || mainWindow.isDestroyed()) {
      mainWindow = createMainWindow(icon);
    }

    const urlWithChat =
      chatId.length > 0 ? `${mainUrl}/chat/${chatId}` : mainUrl;
    try {
      await mainWindow.loadURL(urlWithChat);
    } catch (error) {
      console.error("Failed to load URL:", urlWithChat, error);
    }
    mainWindow.show();
    mainWindow.focus();
  });

  // Load initial URLs
  mainWindow.loadURL(mainUrl);
  searchBarWindow.loadURL(searchUrl);
});

// Quit the app once all windows are closed
app.on("window-all-closed", app.quit);

// Unregister shortcuts on app quit
app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});

// Example IPC channel for testing messages
ipcMain.on("message", (event: IpcMainEvent, message: any) => {
  console.log(message);
  setTimeout(() => event.sender.send("message", "hi from electron"), 500);
});
