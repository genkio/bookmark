import React from "react";
import { MemoryRouter, Route, Switch } from "react-router-dom";
import { ActivationPage } from "../pages/activation";
import { BookmarkPage } from "../pages/bookmark";
import { BookmarksPage } from "../pages/bookmarks";
import { NotFoundPage } from "../pages/not-found";

export const Routes: React.FC = () => {
  return (
    <MemoryRouter>
      <Switch>
        <Route component={BookmarksPage} exact path="/" />
        <Route component={ActivationPage} exact path="/activate" />
        <Route component={BookmarkPage} exact path="/bookmark" />
        <Route component={BookmarkPage} exact path="/bookmark/:id" />
        <Route component={NotFoundPage} />
      </Switch>
    </MemoryRouter>
  );
};
