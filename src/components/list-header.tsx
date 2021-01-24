import { IonListHeader, IonLabel } from "@ionic/react";
import React from "react";

export const ListHeader: React.FC<{ title: string }> = ({ title }) => (
  <IonListHeader>
    <IonLabel className="ion-text-uppercase" style={{ fontSize: "larger" }}>
      {title}
    </IonLabel>
  </IonListHeader>
);
