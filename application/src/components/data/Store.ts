const Store = require('electron-store');

const store = new Store();

export function setItem(name: String, value: any) {
  store.set(name, value);
}

export function getItem(name: String) {
  return store.get(name);
}

export function deleteItem(name: String) {
  store.delete(name);
}
