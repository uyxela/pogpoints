const { ipcRenderer } = require('electron');

export function authenticate() {
  ipcRenderer.invoke('authenticate');
}

export function openEntries() {
  ipcRenderer.invoke('entries');
}
export function openPogPrizeInfo() {
  ipcRenderer.invoke('pogprizeinfo');
}
export function openPrizeQueue() {
  ipcRenderer.invoke('prizequeue');
}
// export function redeemReward(args) {
//   ipcRenderer.invoke('fulfill',args);
// }
