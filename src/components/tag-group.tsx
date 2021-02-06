import { IonBadge } from "@ionic/react";
import React from "react";
import { Link } from "react-router-dom";
import { Bookmark } from "../typing";

export const TagGroup: React.FC<{
  tags: Bookmark["tags"];
}> = ({ tags }) => {
  if (!tags.length) return null;

  return (
    <div className="ion-padding-horizontal ion-padding-bottom">
      {tags.map((tag) => (
        <IonBadge color="light" key={tag} style={{ marginRight: 5 }}>
          <Link to={`/tags/${tag}`}>{tag}</Link>
        </IonBadge>
      ))}
      <IonBadge />
    </div>
  );
};
