import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MainPage from './pages/Principal/index';

import ShowEvent from './pages/Events/index';
import Lists from './pages/Lists/index';

import CreateEvent from './pages/CreateEvent/index';
import CreateInvite from './pages/CreateInvite/index';
import CreateGift from './pages/CreateGift/index';
import CreateService from './pages/CreateService/index';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={MainPage} /> {/* Done */}

        <Route path="/event/:id" exact component={ShowEvent} /> {/* Done */}
        <Route path="/event/:id/:list" exact component={Lists} /> {/* Done */}

        <Route path="/events/:action" component={CreateEvent} /> {/* create: Done, update: Done */}
        <Route path="/event/:id/inviteds/:action" component={CreateInvite} />{/*Create:done, update: done */}
        <Route path="/event/:id/gifts/:action" component={CreateGift} /> {/* Create: ToDo, update: ToDo */}
        <Route path="/event/:id/services/:action" component={CreateService} /> {/* Create: ToDo, update: ToDo */}
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
