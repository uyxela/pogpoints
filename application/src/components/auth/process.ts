const {ipcRenderer} = require("electron");

export function authenticate() {
    ipcRenderer.invoke('authenticate');
}