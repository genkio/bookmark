import { IonRow } from "@ionic/react";
import React, { PropsWithChildren } from "react";

export const Hero: React.FC<PropsWithChildren<{ children: any }>> = ({
  children,
}) => (
  <IonRow
    className="ion-justify-content-center ion-align-items-center"
    style={{ height: "100%" }}
  >
    {children}
  </IonRow>
);
