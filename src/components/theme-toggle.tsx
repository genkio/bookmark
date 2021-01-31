import { IonButton, IonButtons, IonIcon } from "@ionic/react";
import { moon, sunny } from "ionicons/icons";
import React from "react";

export const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = React.useState<boolean>(
    !!window.matchMedia("(prefers-color-scheme: dark)"),
  );

  React.useEffect(() => {
    document.body.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <IonButtons slot="end">
      <IonButton
        color="dark"
        fill="clear"
        onClick={() => setIsDark(!isDark)}
        size="small"
      >
        <IonIcon icon={isDark ? sunny : moon} />
      </IonButton>
    </IonButtons>
  );
};
