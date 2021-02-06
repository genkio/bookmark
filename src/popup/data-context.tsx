import React from "react";
import { Storage } from "../common/storage";
import { useLocalStorage } from "../hooks";
import { Bookmark, IConfig, IStorageData, SearchType } from "../typing";

interface IDataContext {
  bookmarks: Bookmark[];
  deleteBookmark: (bookmark: Bookmark) => void;
  filterBookmarks: (searchType: SearchType, searchTerm: string) => void;
  filteredBookmarks: Bookmark[];
  getBookmark: (id: Bookmark["id"]) => Bookmark;
  getTags: () => Bookmark["tags"];
  isActivationRequired: boolean;
  loadData: () => Promise<IStorageData>;
  resetFilteredBookmarks: () => void;
  updateBookmark: (bookmark: Bookmark) => void;
}

export const DataContext = React.createContext<IDataContext | undefined>(
  undefined,
);

export default function AppProvider({
  children,
}: React.PropsWithChildren<unknown>) {
  const [bookmarks, setBookmarks] = useLocalStorage<Bookmark[]>(
    "bookmarks",
    [],
  );
  const [config, setConfig] = React.useState<IConfig>();
  const [filteredBookmarks, setFilteredBookmarks] = React.useState<Bookmark[]>(
    [],
  );
  const [isActivationRequired, setIsActivationRequired] = React.useState(false);

  React.useEffect(() => {
    if (!config) return;
    if (bookmarks.length > config.freeTierLimit) {
      setIsActivationRequired(true);
    }
  }, [bookmarks, config]);

  const deleteBookmark = (bookmark: Bookmark) => {
    const updatedBookmarks = bookmarks.filter(({ id }) => bookmark.id !== id);
    setBookmarks(updatedBookmarks);
    setFilteredBookmarks(updatedBookmarks);
  };

  const filterBookmarks = (searchType: SearchType, rawSearchTerm: string) => {
    const searchTerm = rawSearchTerm.toLowerCase();

    const results = bookmarks.filter((bookmark) => {
      switch (searchType) {
        case "author":
          return bookmark.author.toLowerCase().includes(searchTerm);
        case "content":
          return bookmark.content?.toLowerCase().includes(searchTerm);
        case "notes":
          return bookmark.notes?.toLowerCase().includes(searchTerm);
        case "tags":
          return bookmark.tags.some((tag) => tag.toLowerCase() === searchTerm);
        case "title":
          return bookmark.title.toLowerCase().includes(searchTerm);
        default:
          return false;
      }
    });
    setFilteredBookmarks(results);
  };

  const getBookmark = (id: Bookmark["id"]) => {
    const bookmark = bookmarks.find((bookmark) => id === bookmark.id);
    return bookmark!;
  };

  const getTags = () => {
    return Array.from(
      new Set(
        bookmarks.reduce<Bookmark["tags"]>(
          (acc, bookmark) => [...acc, ...bookmark.tags],
          [],
        ),
      ),
    );
  };

  const loadData = async () => {
    const {
      bookmarks,
      config,
      isCreate,
      isDark,
      lastActivationReqTs,
      licenseKey,
    } = await Storage.getData();
    setBookmarks(bookmarks);
    setConfig(config);
    setFilteredBookmarks(bookmarks);
    return {
      bookmarks,
      config,
      isCreate,
      isDark,
      lastActivationReqTs,
      licenseKey,
    };
  };

  const resetFilteredBookmarks = () => {
    setFilteredBookmarks(bookmarks);
  };

  const updateBookmark = (bookmark: Bookmark) => {
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
        bookmarks,
        deleteBookmark,
        filterBookmarks,
        filteredBookmarks,
        getBookmark,
        getTags,
        isActivationRequired,
        loadData,
        resetFilteredBookmarks,
        updateBookmark,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
