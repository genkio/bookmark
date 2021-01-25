import React from "react";
import { Storage } from "../common/storage";
import { useLocalStorage } from "../hooks";
import { IBookmark, IStorageData } from "../typing";

interface IDataContext {
  deleteBookmark: (bookmark: IBookmark) => void;
  filterBookmarks: (searchTerm: string) => void;
  filteredBookmarks: IBookmark[];
  getBookmark: (id: IBookmark["id"]) => IBookmark;
  getTags: () => IBookmark["tags"];
  loadData: () => Promise<IStorageData>;
  resetFilteredBookmarks: () => void;
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
  const [filteredBookmarks, setFilteredBookmarks] = React.useState<IBookmark[]>(
    [],
  );

  const deleteBookmark = (bookmark: IBookmark) => {
    const updatedBookmarks = bookmarks.filter(({ id }) => bookmark.id !== id);
    setBookmarks(updatedBookmarks);
    setFilteredBookmarks(updatedBookmarks);
  };

  const filterBookmarks = (rawSearchTerm: string) => {
    const searchTerm = rawSearchTerm.toLowerCase();

    const results = bookmarks.filter((bookmark) => {
      const foundInTitle = bookmark.title
        .toLowerCase()
        .includes(searchTerm.toLocaleLowerCase());

      const foundInTags = bookmark.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm),
      );

      return foundInTitle || foundInTags;
    });
    setFilteredBookmarks(results);
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

  const loadData = async () => {
    const { bookmarks, isCreate } = await Storage.getData();
    setBookmarks(bookmarks);
    setFilteredBookmarks(bookmarks);
    return { bookmarks, isCreate };
  };

  const resetFilteredBookmarks = () => {
    setFilteredBookmarks(bookmarks);
  };

  const updateBookmark = (bookmark: IBookmark) => {
    const updatedBookmarks = [
      bookmark,
      ...bookmarks.filter(({ id }) => id !== bookmark.id),
    ];
    setBookmarks(updatedBookmarks);
    setFilteredBookmarks(updatedBookmarks);
  };

  return (
    <DataContext.Provider
      value={{
        deleteBookmark,
        filterBookmarks,
        filteredBookmarks,
        getBookmark,
        getTags,
        loadData,
        resetFilteredBookmarks,
        updateBookmark,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
