import {
  IonContent,
  IonFooter,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import numbro from "numbro";
import React, { PropsWithChildren } from "react";
import { browser } from "webextension-polyfill-ts";
import { useData } from "../hooks";
import { Hero } from "./hero";
import { SearchInput } from "./search-input";
import { ThemeToggle } from "./theme-toggle";

export const PageWrapper: React.FC<
  PropsWithChildren<{
    action?: React.ReactElement;
    showSearch?: boolean;
    title: string;
  }>
> = ({ action, children, showSearch = true, title }) => {
  const { filteredBookmarks } = useData();

  const count = (
    <span style={{ fontSize: "0.5rem" }}>
      ({numbro(filteredBookmarks.length).format("0a")})
    </span>
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonItem lines="none">
            <IonLabel style={{ fontSize: "x-large" }}>
              {title} {count}
            </IonLabel>
            <ThemeToggle />
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
