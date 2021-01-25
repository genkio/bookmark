import {
  IonAlert,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonRow,
  IonText,
} from "@ionic/react";
import { chevronForwardCircleOutline, trashBinOutline } from "ionicons/icons";
import React from "react";
import { browser } from "webextension-polyfill-ts";
import { IBookmark } from "../typing";
import { TagGroup } from "./tag-group";

const cursorStyle = { cursor: "pointer" };

export const BookmarkCard: React.FC<{
  bookmark: IBookmark;
  onDelete: () => void;
  onEdit: () => void;
}> = ({ bookmark, onDelete, onEdit }) => {
  const { group, tags, title, url } = bookmark;

  const [showAction, setShowAction] = React.useState(false);
  const [confirmDelete, setConfirmDelete] = React.useState(false);

  const alertActions = [
    {
      text: "Cancel",
      role: "cancel",
    },
    {
      text: "Delete",
      handler: onDelete,
    },
  ];

  return (
    <IonCard
      onMouseEnter={() => setShowAction(true)}
      onMouseLeave={() => setShowAction(false)}
    >
      <IonAlert
        isOpen={confirmDelete}
        onDidDismiss={() => setConfirmDelete(false)}
        header={"Delete bookmark"}
        message={"Shall we continue?"}
        buttons={alertActions}
      />
      <IonCardHeader>
        <IonRow className="ion-justify-content-between">
          <IonText>{group}</IonText>
          {showAction && (
            <div>
              <IonIcon
                color="danger"
                icon={trashBinOutline}
                onClick={() => setConfirmDelete(true)}
                style={{ ...cursorStyle, marginRight: 10 }}
              />
              <IonIcon
                icon={chevronForwardCircleOutline}
                onClick={onEdit}
                style={cursorStyle}
              />
            </div>
          )}
        </IonRow>
        <IonCardTitle
          onClick={() => browser.tabs.create({ active: false, url })}
          style={cursorStyle}
        >
          {title}
        </IonCardTitle>
      </IonCardHeader>
      <TagGroup tags={tags} />
    </IonCard>
  );
};
