import React from "react";
import { useHistory } from "react-router-dom";
import { ActionButton } from "../components/action-button";
import { ActivationAlert } from "../components/activation-alert";
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
    <PageWrapper showCount={true} title="IH Bookmarks">
      <ActivationAlert />
      <BookmarkList
        onClick={({ id }) => {
          history.push(`/bookmark/${id}`);
        }}
      />
      <ActionButton />
    </PageWrapper>
  );
};
