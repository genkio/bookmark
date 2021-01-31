import React from "react";
import { useHistory } from "react-router-dom";
import { BookmarkList } from "../components/bookmark-list";
import { PageWrapper } from "../components/page-wrapper";
import { useData } from "../hooks";

export const BookmarksPage: React.FC = () => {
  const history = useHistory();

  const { loadData } = useData();

  React.useEffect(() => {
    loadData().then(({ bookmarks: [bookmark], isCreate }) => {
      if (isCreate && bookmark) {
        history.push(`/bookmark/${bookmark.id}`);
      }
    });
  }, []);

  return (
    <PageWrapper title="IH Bookmarks">
      <BookmarkList
        onClick={({ id }) => {
          history.push(`/bookmark/${id}`);
        }}
      />
    </PageWrapper>
  );
};
