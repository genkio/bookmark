import { IonButton, IonButtons, IonIcon } from "@ionic/react";
import { moon, sunny } from "ionicons/icons";
import React from "react";
import { useLocalStorage } from "../hooks";

export const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useLocalStorage("isDark", false);

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
