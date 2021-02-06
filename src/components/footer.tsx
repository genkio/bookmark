import {
  IonCol,
  IonFooter,
  IonGrid,
  IonRow,
  IonText,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { browser } from "webextension-polyfill-ts";
import packageJson from "../../package.json";

export const Footer: React.FC<{ action?: React.ReactElement }> = ({
  action,
}) => {
  const handleOpenIndieHackers = () =>
    browser.tabs.create({
      url: "https://www.indiehackers.com",
    });

  return (
    <IonFooter className="ion-no-border">
      <IonGrid>
        <IonRow>
          <IonCol size="6">
            <a
              onClick={handleOpenIndieHackers}
              style={{ cursor: "pointer", textDecoration: "underline" }}
            >
              Indie Hackers
            </a>
          </IonCol>
          <IonCol size="6" className="ion-text-end">
            <IonText color="medium">Version: {packageJson.version}</IonText>
          </IonCol>
        </IonRow>
      </IonGrid>
      {action && <IonToolbar>{action}</IonToolbar>}
    </IonFooter>
  );
};
