import { IonLabel } from "@ionic/react";
import React from "react";

export const ItemHeader: React.FC<{ title: string }> = ({ title }) => {
  return (
    <IonLabel className="ion-text-uppercase" position="stacked">
      {title}
    </IonLabel>
  );
};
