import { IonBadge } from "@ionic/react";
import React from "react";
import { IBookmark } from "../typing";

export const TagGroup: React.FC<{
  tags: IBookmark["tags"];
}> = ({ tags }) => {
  if (!tags.length) return null;

  return (
    <div className="ion-padding-horizontal ion-padding-bottom">
      {tags.map((tag) => (
        <IonBadge color="light" key={tag} style={{ marginRight: 5 }}>
          {tag}
        </IonBadge>
      ))}
      <IonBadge />
    </div>
  );
};
