import React from "react";
import { Storage } from "../common/storage";
import { useLocalStorage } from "../hooks";
import { IBookmark } from "../typing";

interface IDataContext {
  bookmarks: IBookmark[];
  deleteBookmark: (bookmark: IBookmark) => void;
  getBookmark: (id: IBookmark["id"]) => IBookmark;
  getTags: () => IBookmark["tags"];
  loadBookmarks: () => Promise<void>;
  updateBookmark: (bookmark: IBookmark) => void;
}

export const DataContext = React.createContext<IDataContext | undefined>(
  undefined,
);

export default function AppProvider({
  children,
}: React.PropsWithChildren<unknown>) {
  const [bookmarks, setBookmarks] = useLocalStorage<IBookmark[]>(
    "bookmarks",
    [],
  );

  const deleteBookmark = (bookmark: IBookmark) => {
    setBookmarks(bookmarks.filter(({ id }) => bookmark.id !== id));
  };

  const getBookmark = (id: IBookmark["id"]) => {
    const bookmark = bookmarks.find((bookmark) => id === bookmark.id);
    return bookmark!;
  };

  const getTags = () => {
    return bookmarks.reduce<IBookmark["tags"]>(
      (acc, bookmark) => [...acc, ...bookmark.tags],
      [],
    );
  };

  const loadBookmarks = async () => {
    const { bookmarks } = await Storage.getData();
    setBookmarks(bookmarks);
  };

  const updateBookmark = (bookmark: IBookmark) => {
    setBookmarks([
      bookmark,
      ...bookmarks.filter(({ id }) => id !== bookmark.id),
    ]);
  };

  return (
    <DataContext.Provider
      value={{
        bookmarks,
        deleteBookmark,
        getBookmark,
        getTags,
        loadBookmarks,
        updateBookmark,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
