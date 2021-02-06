import React from "react";
import "./app.css";
import DataProvider from "./data-context";
import { Routes } from "./routes";

export const App: React.FC = () => {
  return (
    <DataProvider>
      <Routes />
    </DataProvider>
  );
};
