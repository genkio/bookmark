import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import React from "react";
import { IBookmark } from "../typing";

export const BookmarkCard: React.FC<{
  bookmark: IBookmark;
  onClick: () => void;
}> = ({ bookmark, onClick }) => {
  const { author, group, title } = bookmark;

  return (
    <IonCard onClick={onClick} style={{ cursor: "pointer" }}>
      <IonCardHeader>
        <IonCardSubtitle>{group}</IonCardSubtitle>
        <IonCardTitle>{title}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>{author}</IonCardContent>
    </IonCard>
  );
};
