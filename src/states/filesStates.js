import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  atom,
  atomFamily,
  DefaultValue,
  selector,
  selectorFamily,
} from "recoil";

const useLocalStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    setSelf(
      AsyncStorage.getItem(key).then((value) =>
        value ? JSON.parse(value) : new DefaultValue()
      )
    );
    onSet((newValue, _, isReset) => {
      isReset
        ? AsyncStorage.removeItem(key)
        : AsyncStorage.setItem(key, JSON.stringify(newValue));
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
  effects: (fileId) => [useLocalStorageEffect("fileName." + fileId)],
});

export const fileContentState = atomFamily({
  key: "filesStates.fileContentState",
  default: "",
  effects: (fileId) => [useLocalStorageEffect("fileContent." + fileId)],
});
