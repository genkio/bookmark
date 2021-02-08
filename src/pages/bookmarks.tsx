import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonLabel,
  IonRow,
} from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import React from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { ActionButton } from "../components/action-button";
import { ActivationAlert } from "../components/activation-alert";
import { BookmarkList } from "../components/bookmark-list";
import { PageWrapper } from "../components/page-wrapper";
import { useData } from "../hooks";

type Props = RouteComponentProps<{ tag?: string }>;

export const BookmarksPage: React.FC<Props> = ({
  match: {
    params: { tag },
  },
}) => {
  const history = useHistory();

  const { filterBookmarks, loadData, resetFilteredBookmarks } = useData();

  React.useEffect(() => {
    loadData().then(({ bookmarks: [bookmark], isCreate }) => {
      if (isCreate && bookmark) {
        history.push(`/bookmark/${bookmark.id}`);
      }
    });
  }, []);

  React.useEffect(() => {
    if (!tag) return;
    filterBookmarks("tags", tag);
  }, [tag]);

  return (
    <PageWrapper disableBackButton={true} showCount={true} title="IH Bookmarks">
      <ActivationAlert />

      {tag && (
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonButton
                color="light"
                fill="outline"
                onClick={() => {
                  resetFilteredBookmarks();
                  history.push("/");
                }}
                size="small"
              >
                <IonLabel color="dark">{tag}</IonLabel>
                <IonIcon slot="end" icon={closeOutline} />
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      )}

      <BookmarkList
        onClick={({ id }) => {
          history.push(`/bookmark/${id}`);
        }}
      />
      <ActionButton />
    </PageWrapper>
  );
};
