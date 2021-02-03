import { IonAlert } from "@ionic/react";
import React from "react";
import { useHistory } from "react-router-dom";
import { browser } from "webextension-polyfill-ts";
import { activate } from "../common/activator";
import { EMAIL, PRODUCT_LINK } from "../constant";
import { useData } from "../hooks";

export const ActivationAlert: React.FC = () => {
  const history = useHistory();

  const { isActivationRequired, loadData } = useData();

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    loadData()
      .then(({ licenseKey }) => {
        return activate(licenseKey);
      })
      .then(({ success }) => {
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
    {
      text: "",
      role: "cancel",
    },
    {
      text: "Contact us 📧",
      handler: () => {
        browser.tabs.create({
          url: `mailto:Lee<${EMAIL}>?subject=About IH Bookmarks`,
        });
      },
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
