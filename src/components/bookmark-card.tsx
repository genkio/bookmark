import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import React from "react";
import { IBookmark } from "../typing";
import { TagGroup } from "./tag-group";

export const BookmarkCard: React.FC<{
  bookmark: IBookmark;
  onClick: () => void;
}> = ({ bookmark, onClick }) => {
  const { group, tags, title } = bookmark;

  return (
    <IonCard onClick={onClick} style={{ cursor: "pointer" }}>
      <IonCardHeader>
        <IonCardSubtitle>{group}</IonCardSubtitle>
        <IonCardTitle>{title}</IonCardTitle>
      </IonCardHeader>
      <TagGroup tags={tags} />
    </IonCard>
  );
};
