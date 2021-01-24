import { browser } from "webextension-polyfill-ts";
import { IStorageData } from "../typing";

export class Storage {
  static root: string = "bookmarks";
  static storage = browser.storage.local;

  static async getData(): Promise<IStorageData> {
    const data = (await this.storage.get()) as IStorageData;
    return {
      bookmarks: data.bookmarks ?? [],
      isCreate: data.isCreate ?? false,
    };
  }

  static async removeData(key: keyof IStorageData) {
    await this.storage.remove(key);
  }

  static async setData(data: { [s: string]: any }) {
    await this.storage.set(data);
  }
}
