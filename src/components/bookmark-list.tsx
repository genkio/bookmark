import React from "react";
import { useData } from "../hooks";
import { IBookmark } from "../typing";
import { BookmarkCard } from "./bookmark-card";

export const BookmarkList: React.FC<{
  onClick: (bookmark: IBookmark) => void;
}> = ({ onClick }) => {
  const { bookmarks } = useData();

  return (
    <React.Fragment>
      {bookmarks.map((bookmark) => (
        <BookmarkCard
          key={bookmark.id}
          bookmark={bookmark}
          onClick={() => onClick(bookmark)}
        />
      ))}
    </React.Fragment>
  );
};
