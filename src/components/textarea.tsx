import { IonItem, IonTextarea } from "@ionic/react";
import React from "react";
import { ItemHeader } from "./item-header";

export const Textarea: React.FC<{
  onChange: (value: string) => void;
  title: string;
  value: string;
}> = ({ onChange, title, value }) => (
  <IonItem lines="none">
    <ItemHeader title={title} />
    <IonTextarea
      autoGrow
      onIonChange={({ detail: { value } }) => {
        if (value) onChange(value);
      }}
      value={value}
    />
  </IonItem>
);
