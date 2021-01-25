import { IonInput, IonItem } from "@ionic/react";
import React from "react";
import { IBookmark } from "../typing";
import { ItemHeader } from "./item-header";

export const Input: React.FC<{
  disabled?: boolean;
  onChange: (event: React.FormEvent<HTMLIonInputElement>) => void;
  prop: keyof IBookmark;
  title?: string;
  value: string;
}> = ({ disabled, onChange, prop, title, value }) => (
  <IonItem>
    <ItemHeader title={title ?? prop} />
    <IonInput
      disabled={disabled}
      name={prop}
      onInput={onChange}
      type="text"
      value={value}
    />
  </IonItem>
);