import { IonItem, IonTextarea } from "@ionic/react";
import React from "react";
import { ItemHeader } from "./item-header";

export const Textarea: React.FC<{
  onChange: (value: string) => void;
  rows?: number;
  title: string;
  value: string;
}> = ({ onChange, rows = 5, title, value }) => (
  <IonItem lines="none">
    <ItemHeader title={title} />
    <IonTextarea
      onIonChange={({ detail: { value } }) => {
        if (value) onChange(value);
      }}
      rows={rows}
      value={value}
    />
  </IonItem>
);
