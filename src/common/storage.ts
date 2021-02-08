import { browser } from "webextension-polyfill-ts";
import { DEFAULT_OPTIONS } from "../constant";
import { IStorageData } from "../typing";

export class Storage {
  static root = "bookmarks";
  static storage = browser.storage.local;

  static async getData(): Promise<IStorageData> {
    const data = (await this.storage.get()) as IStorageData;
    return {
      bookmarks: data.bookmarks ?? [],
      isCreate: data.isCreate ?? false,
      isDark: false,
      lastActivationReqTs: data.lastActivationReqTs ?? 0,
      licenseKey: data.licenseKey ?? "",
      options: data.options ?? DEFAULT_OPTIONS,
    };
  }

  static async removeData(key: keyof IStorageData) {
    await this.storage.remove(key);
  }

  static async setData(data: { [s: string]: unknown }) {
    await this.storage.set(data);
  }
}
