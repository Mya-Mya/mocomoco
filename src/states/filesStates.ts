import { atom, atomFamily, DefaultValue } from "recoil";

const useLocalStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    const valueInLocalStorage = localStorage.getItem(key);
    const value = valueInLocalStorage
      ? JSON.parse(valueInLocalStorage)
      : new DefaultValue();
    setSelf(value);
    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const fileIdsState = atom({
  key: "filesStates.fileIdsState",
  default: [],
  effects: [useLocalStorageEffect("fileIds")],
});

export const fileNameState = atomFamily({
  key: "filesStates.fileNameState",
  default: "",
  effects: (fileId: string) => [useLocalStorageEffect("fileName." + fileId)],
});

export const fileContentState = atomFamily({
  key: "filesStates.fileContentState",
  default: "",
  effects: (fileId: string) => [useLocalStorageEffect("fileContent." + fileId)],
});
