import { IonFab, IonFabButton, IonIcon, IonFabList } from "@ionic/react";
import React from "react";
import { browser } from "webextension-polyfill-ts";
import { caretUp, logoTwitter, mailOutline, openOutline } from "ionicons/icons";
import { EMAIL } from "../constant";

export const ActionButton: React.FC = () => {
  const handleOpenInTab = () =>
    browser.windows.create({
      url: "popup.html",
      type: "normal",
      width: 480,
    });

  const handleOpenMail = () =>
    browser.tabs.create({
      url: `mailto:Lee<${EMAIL}>?subject=About IH Bookmarks`,
    });

  const handleOpenTwitter = () =>
    browser.tabs.create({
      url: "https://twitter.com/tinywebapp",
    });

  return (
    <IonFab vertical="bottom" horizontal="end" slot="fixed">
      <IonFabButton color="dark" size="small">
        <IonIcon icon={caretUp} />
      </IonFabButton>
      <IonFabList side="top">
        <IonFabButton onClick={handleOpenInTab}>
          <IonIcon icon={openOutline} />
        </IonFabButton>
        <IonFabButton onClick={handleOpenMail}>
          <IonIcon icon={mailOutline} />
        </IonFabButton>
        <IonFabButton onClick={handleOpenTwitter}>
          <IonIcon icon={logoTwitter} />
        </IonFabButton>
      </IonFabList>
    </IonFab>
  );
};
