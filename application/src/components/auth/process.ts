const { ipcRenderer } = require('electron');

export function authenticate() {
  ipcRenderer.invoke('authenticate');
}

export function redeemReward(args) {
  ipcRenderer.invoke('fulfill',args);
}
