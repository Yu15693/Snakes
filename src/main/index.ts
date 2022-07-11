import {app, BrowserWindow} from 'electron';
import * as path from 'path';
import * as url from 'url';
import __basedir from '../basepath';

let mainWindow: Electron.BrowserWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    minHeight: 700,
    minWidth: 1000,
  });
  mainWindow.loadFile(
    path.join(__basedir, __dirname, '../renderer/dist/index.html')
  );

  mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
