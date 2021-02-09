import {
  IonAlert,
  IonButton,
  IonInput,
  IonItem,
  IonList,
  IonLoading,
} from "@ionic/react";
import React from "react";
import { browser } from "webextension-polyfill-ts";
import { activate } from "../common/activator";
import { ItemHeader } from "../components/item-header";
import { PageWrapper } from "../components/page-wrapper";
import { EMAIL, PRODUCT_LINK } from "../constant";
import { useLocalStorage } from "../hooks";
import { IStorageData } from "../typing";

export const ActivationPage: React.FC = () => {
  const [licenseKey, setLicenseKey] = useLocalStorage<
    IStorageData["licenseKey"]
  >("licenseKey", "");
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const alert = (
    <IonAlert
      isOpen={!!message}
      onDidDismiss={() => setMessage("")}
      header={message === "Succeed" ? "Thank You!" : "Activation Error"}
      message={message}
      buttons={[
        {
          text: "Contact support",
          handler: () =>
            browser.tabs.create({
              url: `mailto:Lee<${EMAIL}>?subject=Problem with activation`,
            }),
        },
      ]}
    />
  );

  const handleOpenProductLink = () =>
    browser.tabs.create({
      url: PRODUCT_LINK,
    });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loading || !licenseKey) return;

    try {
      setLoading(true);
      const { message, success } = await activate({
        isUser: true,
        licenseKey,
        lastActivationReqTs: null,
      });
      setMessage(message);
      if (!success) setMessage(message);
    } catch (e) {
      setMessage(`Failed to activate: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper showSearch={false} title="Activation">
      <IonLoading
        isOpen={loading}
        message="Activating..."
        onDidDismiss={() => setLoading(false)}
      />
      {alert}
      <form onSubmit={handleSubmit}>
        <IonList>
          <IonItem>
            <ItemHeader title="License key" />
            <IonInput
              name="name"
              placeholder="Enter your license key here"
              type="text"
              value={licenseKey}
              onInput={({ currentTarget: { value } }) => {
                if (value) setLicenseKey(value.toString());
              }}
            />
          </IonItem>
          <p className="ion-padding-start">
            Please consider{" "}
            <a
              href="#"
              onClick={handleOpenProductLink}
              style={{ textDecoration: "underline" }}
            >
              getting a license
            </a>{" "}
            (a one-time purchase) to support us.
          </p>

          <IonButton
            disabled={loading || !licenseKey}
            expand="block"
            fill="clear"
            type="submit"
          >
            Activate
          </IonButton>
        </IonList>
      </form>
    </PageWrapper>
  );
};
