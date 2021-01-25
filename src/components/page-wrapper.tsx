import {
  IonContent,
  IonFooter,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import React, { PropsWithChildren } from "react";

export const PageWrapper: React.FC<
  PropsWithChildren<{
    action?: React.ReactElement;
    title: string;
  }>
> = ({ action, children, title }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonItem lines="none">
            <IonLabel style={{ fontSize: "x-large" }}>{title}</IonLabel>
          </IonItem>
        </IonToolbar>
      </IonHeader>
      <IonContent>{children}</IonContent>

      {action && (
        <IonFooter className="ion-no-border">
          <IonToolbar>{action}</IonToolbar>
        </IonFooter>
      )}
    </IonPage>
  );
};
