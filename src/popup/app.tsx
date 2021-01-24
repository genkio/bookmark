import React from "react";
import DataProvider from "./data-context";
import { Routes } from "./routes";

export const App: React.FC = () => {
  return (
    <DataProvider>
      <Routes />
    </DataProvider>
  );
};
