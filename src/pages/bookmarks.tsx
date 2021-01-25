import React from "react";
import { useHistory } from "react-router-dom";
import { BookmarkList } from "../components/bookmark-list";
import { PageWrapper } from "../components/page-wrapper";
import { useData } from "../hooks";

export const BookmarksPage: React.FC = () => {
  const history = useHistory();

  const { loadData } = useData();

  React.useEffect(() => {
    loadData().then(({ bookmarks: [{ id }], isCreate }) => {
      if (isCreate) {
        history.push(`/bookmark/${id}`);
      }
    });
  }, []);

  return (
    <PageWrapper title="Bookmarks">
      <BookmarkList
        onClick={({ id }) => {
          history.push(`/bookmark/${id}`);
        }}
      />
    </PageWrapper>
  );
};
