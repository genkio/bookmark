import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import { arrowBackOutline } from "ionicons/icons";
import numbro from "numbro";
import React, { PropsWithChildren } from "react";
import { useHistory } from "react-router-dom";
import { browser } from "webextension-polyfill-ts";
import { useData } from "../hooks";
import { Footer } from "./footer";
import { Hero } from "./hero";
import { SearchInput } from "./search-input";
import { ThemeToggle } from "./theme-toggle";

export const PageWrapper: React.FC<
  PropsWithChildren<{
    action?: React.ReactElement;
    disableBackButton?: boolean;
    showCount?: boolean;
    showSearch?: boolean;
    title: string;
  }>
> = ({
  action,
  children,
  disableBackButton = false,
  showCount,
  showSearch = true,
  title,
}) => {
  const { filteredBookmarks } = useData();
  const history = useHistory();

  const count = (
    <span style={{ fontSize: "0.5rem" }}>
      ({numbro(filteredBookmarks.length).format("0a")})
    </span>
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          {!disableBackButton && (
            <IonButtons slot="start">
              <IonButton fill="clear" onClick={() => history.push("/")}>
                <IonIcon icon={arrowBackOutline} />
              </IonButton>
            </IonButtons>
          )}
          <IonItem lines="none">
            <IonLabel style={{ fontSize: "x-large" }}>
              {title} {showCount && count}
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

      <Footer action={action} />
    </IonPage>
  );
};
