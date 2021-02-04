import { IonAlert } from "@ionic/react";
import React from "react";
import { useHistory } from "react-router-dom";
import { browser } from "webextension-polyfill-ts";
import { activate } from "../common/activator";
import { PRODUCT_LINK } from "../constant";
import { useData, useLocalStorage } from "../hooks";
import { IStorageData } from "../typing";

export const ActivationAlert: React.FC = () => {
  const history = useHistory();

  const { isActivationRequired, loadData } = useData();

  const [, setLastActivationReqTs] = useLocalStorage<
    IStorageData["lastActivationReqTs"]
  >("lastActivationReqTs", 0);

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    loadData()
      .then(({ licenseKey, lastActivationReqTs }) => {
        return activate({ licenseKey, lastActivationReqTs });
      })
      .then(({ success, timestamp }) => {
        if (timestamp) {
          setLastActivationReqTs(timestamp);
        }
        if (isActivationRequired && !success) {
          setOpen(true);
        }
      });
  }, [isActivationRequired]);

  const alertActions = [
    {
      text: "Activate my license key 👍",
      handler: () => history.push("/activate"),
    },
    {
      text: "Let's get one 👏",
      handler: () => {
        browser.tabs.create({ url: PRODUCT_LINK });
      },
    },
    {
      text: "Go away 😭",
      role: "cancel",
    },
  ];

  return (
    <IonAlert
      isOpen={open}
      onDidDismiss={() => setOpen(false)}
      header={"Gentle Reminder"}
      message={
        "Please consider getting a license (a one-time purchase) to support us."
      }
      buttons={alertActions}
    />
  );
};
