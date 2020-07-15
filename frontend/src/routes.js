import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MainPage from './pages/Principal/index';

import EventsList from './pages/Lists/Events/index';
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

        <Route path="/events" exact component={EventsList} />
        <Route path="/event/inviteds" exact component={InvitedsList} />
        <Route path="/event/gifts" exact component={GiftsList} />

        <Route path="/events/new" component={CreateEvent} />
        <Route path="/event/inviteds/new" component={CreateInvite} />
        <Route path="/event/gifts/new" component={CreateGift} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
