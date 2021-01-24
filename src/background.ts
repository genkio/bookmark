import { browser } from "webextension-polyfill-ts";
import { Storage } from "./common/storage";
import { IMessage } from "./typing";

browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab?.url?.includes("http")) {
    await browser.tabs.executeScript(tabId, { file: "./foreground.bundle.js" });
  }
});

browser.runtime.onMessage.addListener(
  async ({ bookmark, isCreate }: IMessage) => {
    const { bookmarks } = await Storage.getData();

    const notFound = !bookmarks.find(({ id }) => bookmark.id === id);
    if (notFound) bookmarks.unshift(bookmark);

    await Storage.setData({
      bookmarks: !bookmarks.length ? [bookmark] : bookmarks,
      isCreate,
    });

    if (isCreate) {
      await browser.windows.create({
        url: "popup.html",
        type: "popup",
        width: 320,
        height: 568,
      });
    }
  },
);
