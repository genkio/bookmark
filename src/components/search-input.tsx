import { IonInput, IonItem, IonSelect, IonSelectOption } from "@ionic/react";
import React from "react";
import { useData } from "../hooks";
import { SearchType } from "../typing";

const searchTypes: SearchType[] = ["author", "content", "notes", "title"];

export const SearchInput: React.FC = () => {
  const { filterBookmarks, resetFilteredBookmarks } = useData();

  const [searchType, setSearchType] = React.useState<SearchType>("title");

  const handleSearch = ({
    currentTarget: { value },
  }: React.FormEvent<HTMLIonInputElement>) => {
    if (!value) {
      resetFilteredBookmarks();
    } else {
      filterBookmarks(searchType, value.toString());
    }
  };

  return (
    <IonItem lines="none">
      <IonInput onInput={handleSearch} placeholder="Search" type="search" />
      <IonSelect
        interface="popover"
        onIonChange={({ detail: { value } }) => setSearchType(value)}
        value={searchType}
      >
        {searchTypes.map((st) => (
          <IonSelectOption key={st} value={st}>
            {st}
          </IonSelectOption>
        ))}
      </IonSelect>
    </IonItem>
  );
};
