import { IonItem, IonTextarea } from "@ionic/react";
import React from "react";
import { ItemHeader } from "./item-header";

export const Textarea: React.FC<{
  onChange: (value: string) => void;
  title: string;
  value: string;
}> = ({ onChange, title, value }) => (
  <IonItem>
    <ItemHeader title={title} />
    <IonTextarea
      onIonChange={({ detail: { value } }) => {
        if (value) onChange(value);
      }}
      rows={5}
      value={value}
    />
  </IonItem>
);
