/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build:main`, this file is compiled to
 * `./src/main.prod.js` using webpack. This gives us some performance wins.
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import Store from 'electron-store';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';

const authService = require('./components/auth/service');

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;
Store.initRenderer();

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1124,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    console.log(mainWindow.webContents.getURL());
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

ipcMain.handle('authenticate', (event, arg) => {
  const authWin: BrowserWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Log In - Twitch',
    webPreferences: {
      nodeIntegration: false,
    },
  });

  authWin.loadURL(authService.getAuthenticationURL());
  authWin.show();
  authWin.focus();

  const {
    session: { webRequest },
  } = authWin.webContents;

  const filter = {
    urls: ['http://localhost/callback*'],
  };

  webRequest.onBeforeRequest(filter, async ({ url }) => {
    authService.handleCallback(url);
    authService.checkUser();
    mainWindow?.reload();
    mainWindow?.focus();
    authWin.destroy();
  });
});

ipcMain.handle('entries', (event, arg) => {
  const entriesWindow: BrowserWindow = new BrowserWindow({
    width: 350,
    height: 600,
    title: `Viewer Entries`,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
    },
  });

  entriesWindow.loadURL(`file://${__dirname}/index.html#entries`);
  entriesWindow.show();
  entriesWindow.focus();

  entriesWindow.on('closed', () => {
    mainWindow?.focus();
    entriesWindow.destroy();
  });
});

ipcMain.handle('pogprizeinfo', (event, arg) => {
  const infoWindow: BrowserWindow = new BrowserWindow({
    width: 450,
    height: 700,
    title: `PogPrize Info`,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
    },
  });

  infoWindow.loadURL(`file://${__dirname}/index.html#pogprizeinfo`);
  infoWindow.show();
  infoWindow.focus();

  infoWindow.on('closed', () => {
    mainWindow?.focus();
    infoWindow.destroy();
  });
});

ipcMain.handle('prizequeue', (event, arg) => {
  const queueWindow: BrowserWindow = new BrowserWindow({
    width: 350,
    height: 600,
    title: `Prize Queue`,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
    },
  });

  queueWindow.loadURL(`file://${__dirname}/index.html#prizequeue`);
  queueWindow.show();
  queueWindow.focus();

  queueWindow.on('closed', () => {
    mainWindow?.focus();
    queueWindow.destroy();
  });
});
/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.whenReady().then(createWindow).catch(console.log);

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});
