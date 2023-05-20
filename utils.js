import { menuArray } from "./data.js";

function getUniqueKeyInDataset(dataset) {
  const keys = Object.keys(dataset);
  if (keys.length === 1) {
    return keys[0];
  } else {
    throw Error(`No unique key: dataset=${dataset}`);
  }
}

function getMenuKey(name) {
  const keys = menuArray
    .map((item) => item.name)
    .filter((k) => k.toLowerCase() === name.toLowerCase());
  if (keys.length === 1) {
    return keys[0];
  } else {
    throw Error(`No unique key: keys=${keys}, name=${name}`);
  }
}

export function getMenuKeyFromDataset(dataset) {
  const key = getUniqueKeyInDataset(dataset);
  return getMenuKey(key);
}
