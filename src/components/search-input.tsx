import { IonInput, IonItem } from "@ionic/react";
import React from "react";
import { useData } from "../hooks";

export const SearchInput: React.FC = () => {
  const { filterBookmarks, resetFilteredBookmarks } = useData();

  const handleSearch = ({
    currentTarget: { value },
  }: React.FormEvent<HTMLIonInputElement>) => {
    if (!value) {
      resetFilteredBookmarks();
    } else {
      filterBookmarks(value.toString());
    }
  };

  return (
    <IonItem lines="none">
      <IonInput
        onInput={handleSearch}
        placeholder="Search [ title or tags ]"
        type="search"
      />
    </IonItem>
  );
};
