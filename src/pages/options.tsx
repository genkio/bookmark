import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonToast,
  IonToggle,
} from "@ionic/react";
import React from "react";
import { ListHeader } from "../components/list-header";
import { PageWrapper } from "../components/page-wrapper";
import { DEFAULT_OPTIONS } from "../constant";
import { useLocalStorage } from "../hooks";
import { IStorageData } from "../typing";

export const OptionsPage: React.FC = () => {
  const [options, setOptions] = useLocalStorage<IStorageData["options"]>(
    "options",
    { ...DEFAULT_OPTIONS },
  );
  const [showToast, setShowToast] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowToast(true);
  };

  return (
    <PageWrapper showSearch={false} title="Options">
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message="Options have been saved."
        duration={1000}
      />
      <form onSubmit={handleSubmit}>
        <IonList>
          <ListHeader title="Post" />
          <IonItem>
            <IonLabel>Enabled</IonLabel>
            <IonToggle
              checked={options.post.enabled}
              color="dark"
              onIonChange={(e) =>
                setOptions({
                  ...options,
                  post: {
                    enabled: e.detail.checked,
                  },
                })
              }
            />
          </IonItem>

          <ListHeader title="Comment" />
          <IonItem>
            <IonLabel>Enabled</IonLabel>
            <IonToggle
              checked={options.comment.enabled}
              color="dark"
              onIonChange={(e) =>
                setOptions({
                  ...options,
                  comment: {
                    enabled: e.detail.checked,
                    limit: options.comment.limit,
                  },
                })
              }
            />
          </IonItem>

          <IonItem>
            <IonLabel>Limit</IonLabel>
            <IonInput
              disabled={!options.comment.enabled}
              name="limit"
              type="number"
              value={options.comment.limit}
              onInput={({ currentTarget: { value } }) => {
                if (value)
                  setOptions({
                    ...options,
                    comment: {
                      enabled: options.post.enabled,
                      limit: Number(value ?? options.comment.limit),
                    },
                  });
              }}
            />
          </IonItem>
          <p className="ion-padding-start">
            Number of comments per post you would like to enable bookmarking?
            Keep it small for better performance.
          </p>

          <IonButton expand="block" fill="clear" type="submit">
            Save
          </IonButton>
        </IonList>
      </form>
    </PageWrapper>
  );
};
