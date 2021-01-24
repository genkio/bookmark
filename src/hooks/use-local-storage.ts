import React from "react";
import { browser } from "webextension-polyfill-ts";
import { Storage } from "../common/storage";

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (data: T) => void] {
  const [storedValue, setStoredValue] = React.useState<T>(initialValue);

  React.useEffect(() => {
    browser.storage.local
      .get(key)
      .then((data) =>
        setStoredValue(data[key] ? (data[key] as T) : initialValue),
      );
  }, []);

  const setValue = async (value: T) => {
    setStoredValue(value);
    await Storage.setData({ [key]: value });
  };

  return [storedValue, setValue];
}
