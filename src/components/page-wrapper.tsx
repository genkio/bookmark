import {
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonText,
  IonToolbar,
} from "@ionic/react";
import numbro from "numbro";
import React, { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { browser } from "webextension-polyfill-ts";
import packageJson from "../../package.json";
import { useData } from "../hooks";
import { Hero } from "./hero";
import { SearchInput } from "./search-input";
import { ThemeToggle } from "./theme-toggle";

export const PageWrapper: React.FC<
  PropsWithChildren<{
    action?: React.ReactElement;
    showCount?: boolean;
    showSearch?: boolean;
    title: string;
  }>
> = ({ action, children, showCount, showSearch = true, title }) => {
  const { filteredBookmarks } = useData();

  const count = (
    <span style={{ fontSize: "0.5rem" }}>
      ({numbro(filteredBookmarks.length).format("0a")})
    </span>
  );

  const handleOpenIndieHackers = () =>
    browser.tabs.create({
      url: "https://www.indiehackers.com",
    });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonItem lines="none">
            <IonLabel style={{ fontSize: "x-large" }}>
              <Link to="/">{title}</Link> {showCount && count}
            </IonLabel>
            <ThemeToggle />
          </IonItem>
        </IonToolbar>
      </IonHeader>

      {showSearch && <SearchInput />}
      <IonContent>
        {!filteredBookmarks.length ? (
          <Hero style={{ height: "90%" }}>
            <img src={browser.extension.getURL("dinosaur.gif")} />
          </Hero>
        ) : (
          children
        )}
        <IonGrid>
          <IonRow>
            <IonCol size="6">
              <a onClick={handleOpenIndieHackers} style={{ cursor: "pointer" }}>
                Indie Hackers
              </a>
            </IonCol>
            <IonCol size="6" className="ion-text-end">
              <IonText color="medium">Version: {packageJson.version}</IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>

      {action && (
        <IonFooter className="ion-no-border">
          <IonToolbar>{action}</IonToolbar>
        </IonFooter>
      )}
    </IonPage>
  );
};
