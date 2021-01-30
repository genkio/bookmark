import React from "react";
import { useData } from "../hooks";
import { Bookmark } from "../typing";
import { BookmarkCard } from "./bookmark-card";

export const BookmarkList: React.FC<{
  onClick: (bookmark: Bookmark) => void;
}> = ({ onClick }) => {
  const { deleteBookmark, filteredBookmarks } = useData();

  return (
    <React.Fragment>
      {filteredBookmarks.map((bookmark) => (
        <BookmarkCard
          key={bookmark.id}
          bookmark={bookmark}
          onEdit={() => onClick(bookmark)}
          onDelete={() => deleteBookmark(bookmark)}
        />
      ))}
    </React.Fragment>
  );
};
