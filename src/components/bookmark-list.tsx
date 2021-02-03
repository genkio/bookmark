import { IonButton } from "@ionic/react";
import React from "react";
import { useData } from "../hooks";
import { Bookmark } from "../typing";
import { BookmarkCard } from "./bookmark-card";

const BOOKMARKS_PER_LOAD = 50;

export const BookmarkList: React.FC<{
  onClick: (bookmark: Bookmark) => void;
}> = ({ onClick }) => {
  const { deleteBookmark, filteredBookmarks } = useData();
  const [bookmarks, setBookmarks] = React.useState<Bookmark[]>([]);

  React.useEffect(() => {
    if (!!filteredBookmarks.length) {
      setBookmarks(filteredBookmarks.slice(0, BOOKMARKS_PER_LOAD));
    }
  }, [filteredBookmarks.length]);

  const hasMore = filteredBookmarks.length > bookmarks.length;

  const handleLoadMore = () => {
    setBookmarks([
      ...bookmarks,
      ...filteredBookmarks.slice(
        bookmarks.length,
        bookmarks.length + BOOKMARKS_PER_LOAD,
      ),
    ]);
  };

  return (
    <React.Fragment>
      {bookmarks.map((bookmark) => (
        <BookmarkCard
          bookmark={bookmark}
          key={bookmark.id}
          onEdit={() => onClick(bookmark)}
          onDelete={() => deleteBookmark(bookmark)}
        />
      ))}
      {hasMore && (
        <IonButton
          expand="block"
          fill="clear"
          onClick={handleLoadMore}
          type="submit"
        >
          Load more
        </IonButton>
      )}
    </React.Fragment>
  );
};
