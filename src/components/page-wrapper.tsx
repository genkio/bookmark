import {
  IonContent,
  IonFooter,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import React, { PropsWithChildren } from "react";
import { browser } from "webextension-polyfill-ts";
import { useData } from "../hooks";
import { Hero } from "./hero";
import { SearchInput } from "./search-input";

export const PageWrapper: React.FC<
  PropsWithChildren<{
    action?: React.ReactElement;
    showSearch?: boolean;
    title: string;
  }>
> = ({ action, children, showSearch = true, title }) => {
  const { filteredBookmarks } = useData();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonItem lines="none">
            <IonLabel style={{ fontSize: "x-large" }}>{title}</IonLabel>
          </IonItem>
        </IonToolbar>
      </IonHeader>

      {showSearch && <SearchInput />}
      <IonContent>
        {!filteredBookmarks.length ? (
          <Hero>
            <img src={browser.extension.getURL("dinosaur.gif")} />
          </Hero>
        ) : (
          children
        )}
      </IonContent>

      {action && (
        <IonFooter className="ion-no-border">
          <IonToolbar>{action}</IonToolbar>
        </IonFooter>
      )}
    </IonPage>
  );
};
