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
  // Tray,
} from "electron";
import isDev from "electron-is-dev";
import prepareNext from "electron-next";
import ipc from "./ipc";
import { SchemaType } from "./store";
import Store from "electron-store";

/**
 * Main entry point for the Electron app.
 */

let show = false;

// Initialize IPC handlers
const store = new Store<SchemaType>();
ipc.init(store);

// Prepare the renderer once the app is ready
app.on("ready", async () => {
  await prepareNext("./");

  const icon = join(__dirname, "../public/mistral.png");

  // Create the browser window for the app
  const mainWindow = new BrowserWindow({
    width: 1080,
    height: 720,
    center: true,
    icon: icon,

    webPreferences: {
      nodeIntegration: false,
      sandbox: false,
      contextIsolation: true,
      preload: join(__dirname, "preload.js"),
    },
  });

  // Create the browser window for the quick search bar
  const searchBarWindow = new BrowserWindow({
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

  const mainUrl = isDev
    ? "http://localhost:8000/"
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

  // Register the global shortcut to show/hide the quick search bar
  globalShortcut.register("CommandOrControl+Shift+I", () => {
    if (!searchBarWindow) {
      return;
    }
    if (show) {
      searchBarWindow.hide();
      show = false;
    } else {
      show = true;
      searchBarWindow.show();
    }
  });

  mainWindow.loadURL(mainUrl);
  searchBarWindow.loadURL(searchUrl);
});

// Quit the app once all windows are closed
app.on("window-all-closed", app.quit);

app.on("will-quit", () => {
  // Unregister all shortcuts.
  globalShortcut.unregisterAll();
});

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on("message", (event: IpcMainEvent, message: any) => {
  console.log(message);
  setTimeout(() => event.sender.send("message", "hi from electron"), 500);
});
