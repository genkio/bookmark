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
  cardOutline,
  downloadOutline,
  logoTwitter,
  mailOutline,
  openOutline,
  settingsOutline,
} from "ionicons/icons";
import { EMAIL } from "../constant";
import { useData } from "../hooks";
import { Bookmark } from "../typing";
import { useHistory } from "react-router-dom";

const PROMOTE_MESSAGE =
  "I'm using IH Bookmarks to build up my indie hacking knowledge one bookmark at a time!";
const CHROME_WEBSTORE_URL =
  "https://chrome.google.com/webstore/detail/ih-bookmarks/fbajbcjjogpjcnkoplgkogkipnbiegbb";

function processContent(content: string | string[] | undefined): string {
  if (!content) return "N/A";

  return Array.isArray(content)
    ? `"${content.map((v) => v.replace(/"/g, "'")).join(",")}"`
    : `"${content.replace(/"/g, "'")}"`;
}

function downloadCsv(bookmarks: Bookmark[]) {
  const typeNameMap: Record<Bookmark["type"], string> = {
    comment: "Comment",
    post: "Post",
  };

  const headers: (keyof Bookmark)[][] = [
    ["type", "title", "author", "content", "url", "notes", "tags"],
  ];
  const all = bookmarks.map((bookmark) =>
    headers[0].map((prop) =>
      prop === "type" ? typeNameMap[bookmark[prop]] : bookmark[prop],
    ),
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
  const history = useHistory();

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
      url: `mailto:Joe<${EMAIL}>?subject=About IH Bookmarks`,
    });

  const handleOpenTwitter = () =>
    browser.tabs.create({
      url: `http://twitter.com/share?text=${encodeURIComponent(
        PROMOTE_MESSAGE,
      )}&url=${CHROME_WEBSTORE_URL}&hashtags=indiehackers`,
    });

  const handleOpenActivation = () => history.push("/activate");

  return (
    <IonFab vertical="bottom" horizontal="end" slot="fixed">
      <IonAlert
        isOpen={confirmDownload}
        onDidDismiss={() => setConfirmDownload(false)}
        header={"Export Bookmarks"}
        message={"Do you want to export all your data?"}
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
          },
          {
            text: "Export",
            handler: () => downloadCsv(bookmarks),
          },
        ]}
      />
      <IonFabButton color="dark" size="small">
        <IonIcon icon={caretUp} />
      </IonFabButton>
      <IonFabList side="top">
        <IonFabButton onClick={handleOpenInTab}>
          <IonIcon icon={openOutline} />
        </IonFabButton>
        <IonFabButton onClick={() => history.push("/options")}>
          <IonIcon icon={settingsOutline} />
        </IonFabButton>
        <IonFabButton onClick={handleOpenMail}>
          <IonIcon icon={mailOutline} />
        </IonFabButton>
        <IonFabButton onClick={handleOpenTwitter}>
          <IonIcon icon={logoTwitter} />
        </IonFabButton>
        <IonFabButton onClick={() => handleOpenActivation()}>
          <IonIcon icon={cardOutline} />
        </IonFabButton>
        <IonFabButton onClick={() => setConfirmDownload(true)}>
          <IonIcon icon={downloadOutline} />
        </IonFabButton>
      </IonFabList>
    </IonFab>
  );
};
