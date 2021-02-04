import { browser } from "webextension-polyfill-ts";
import { IConfig, IStorageData } from "../typing";

const DEFAULT_CONFIG: IConfig = { freeTierLimit: 3 };
export class Storage {
  static root = "bookmarks";
  static storage = browser.storage.local;

  static async getData(): Promise<IStorageData> {
    const data = (await this.storage.get()) as IStorageData;
    return {
      bookmarks: data.bookmarks ?? [],
      config: { ...DEFAULT_CONFIG },
      isCreate: data.isCreate ?? false,
      isDark: false,
      lastActivationReqTs: data.lastActivationReqTs ?? 0,
      licenseKey: data.licenseKey ?? "",
    };
  }

  static async removeData(key: keyof IStorageData) {
    await this.storage.remove(key);
  }

  static async setData(data: { [s: string]: unknown }) {
    await this.storage.set(data);
  }
}
