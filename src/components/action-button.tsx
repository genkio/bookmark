import {
  IonFab,
  IonFabButton,
  IonIcon,
  IonFabList,
  IonAlert,
} from "@ionic/react";
import React from "react";
import { browser } from "webextension-polyfill-ts";
import {
  caretUp,
  downloadOutline,
  logoTwitter,
  mailOutline,
  openOutline,
} from "ionicons/icons";
import { EMAIL } from "../constant";
import { useData } from "../hooks";
import { Bookmark } from "../typing";

function processContent(content: string | string[] | undefined): string {
  if (!content) return "N/A";

  return Array.isArray(content)
    ? `"${content.map((v) => v.replace(/"/g, "'")).join(",")}"`
    : `"${content.replace(/"/g, "'")}"`;
}

function downloadCsv(bookmarks: Bookmark[]) {
  const headers: (keyof Bookmark)[][] = [
    ["type", "title", "author", "content", "url", "notes", "tags"],
  ];
  const all = bookmarks.map((bookmark) =>
    headers[0].map((prop) => bookmark[prop]),
  );

  const body =
    "data:text/csv;charset=utf-8," +
    [...headers, ...all]
      .map((row) => row.map(processContent))
      .map((row) => row.join(","))
      .join("\n");

  const encodedUri = encodeURI(body);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `ih-bookmarks-${new Date().valueOf()}.csv`);
  document.body.appendChild(link); // Required for FF

  link.click();
}

export const ActionButton: React.FC = () => {
  const { bookmarks } = useData();
  const [confirmDownload, setConfirmDownload] = React.useState(false);

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

  const alertActions = [
    {
      text: "Cancel",
      role: "cancel",
    },
    {
      text: "Export",
      handler: () => downloadCsv(bookmarks),
    },
  ];

  return (
    <IonFab vertical="bottom" horizontal="end" slot="fixed">
      <IonAlert
        isOpen={confirmDownload}
        onDidDismiss={() => setConfirmDownload(false)}
        header={"Export Bookmarks"}
        message={"Do you want to export all your data?"}
        buttons={alertActions}
      />
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
        <IonFabButton onClick={() => setConfirmDownload(true)}>
          <IonIcon icon={downloadOutline} />
        </IonFabButton>
      </IonFabList>
    </IonFab>
  );
};