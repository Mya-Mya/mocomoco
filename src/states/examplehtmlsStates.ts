import { selector, selectorFamily } from "recoil";
import { createClient } from "microcms-js-sdk";

const client = createClient({
  apiKey: "c3d4d0b2cb2d4ecbbe7e84fb163dae497bb8",
  serviceDomain: "mocomoco",
});

const contentsState = selector({
  key: "examplehtmls.contents",
  get: async ({}) => {
    const contents = (await client.get({ endpoint: "examplehtmls" })).contents;
    console.log("examplehtmls.contents", contents);
    return contents;
  },
});
export const idsState = selector({
  key: "examplehtmls.ids",
  get: ({ get }) => {
    const ids = get(contentsState).map(({ id }) => id);
    console.log("examplehtmls.ids", ids);
    return ids;
  },
});

export const idAndTitlePairsState = selector({
  key: "examplehtmls.idAndTitlePairsState",
  get: ({ get }) => {
    const idAndTitlePairs = get(contentsState).map(({ id, title }) => ({
      id,
      title,
    }));

    console.log("examplehtmls.idAndTitlePairsState", idAndTitlePairs);
    return idAndTitlePairs;
  },
});

export const titleState = selectorFamily({
  key: "examplehtmls.title",
  get:
    (contentId) =>
    ({ get }) => {
      const title = get(contentsState).find(({ id }) => id === contentId).title;
      console.log("examplehtmls.title", contentId, title);
      return title;
    },
});

export const codeState = selectorFamily({
  key: "examplehtmls.code",
  get:
    (contentId) =>
    ({ get }) => {
      const code = get(contentsState).find(({ id }) => id === contentId).code;
      console.log("examplehtmls.code", contentId, code);
      return code;
    },
});
