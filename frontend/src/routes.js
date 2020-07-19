import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MainPage from './pages/Principal/index';

import ShowEvent from './pages/Events/index';
import InvitedsList from './pages/Lists/Inviteds/index';
import GiftsList from './pages/Lists/Gifts/index';

import CreateEvent from './pages/CreateEvent/index';
import CreateInvite from './pages/CreateInvite/index';
import CreateGift from './pages/CreateGift/index';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={MainPage} />

        <Route path="/event/:id" exact component={ShowEvent} />
        <Route path="/event/:id/inviteds" exact component={InvitedsList} />
        <Route path="/event/:id/gifts" exact component={GiftsList} />

        <Route path="/new-event" component={CreateEvent} />
        <Route path="/event/:id/inviteds/new" component={CreateInvite} />
        <Route path="/event/:id/gifts/new" component={CreateGift} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
