import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import './style.css';

const events = [
  {
    id: 1,
    name: 'evento 1',
    convidados: 12,
  },
  {
    id: 2,
    name: 'evento 2',
    convidados: 20,
  },
  {
    id: 3,
    name: 'evento 3',
    convidados: 10,
  },
]

function Prinipal() {
  const history = useHistory();

  return (
    <div>
      <h1>Events Planner</h1>
      <div className="content">
        <h2>Sua Lista de Eventos</h2>
        <ul>
          {events.map(event => (
            <li key={event.id}>
              <div id="event-data">

                <h3>{event.name}</h3>

                <dl>
                  <dt>Quantidade de convidados</dt>
                  <dd>{event.convidados}</dd>
                  <dt>Quantidade de convidados</dt>
                  <dd>{event.convidados}</dd>
                  <dt>Quantidade de convidados</dt>
                  <dd>{event.convidados}</dd>
                </dl>

              </div>

              <Link to={`/invited/${event.id}`}>Abrir</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Prinipal;
