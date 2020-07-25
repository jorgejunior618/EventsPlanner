import React from 'react';
import { Link } from 'react-router-dom';

import './style.css';
import trashIcon from '../../assets/trash.svg'

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
  localStorage.clear();

  function handleDelete() {
    console.log('deletou')
  }

  return (
    <div>
      <Link to="/">
        <h1>Events Planner</h1>
      </Link>

      <div className="content">
        <div id="head">
          <h2>Sua Lista de Eventos</h2>

          <Link id="create" to="/new-event">
            Adicionar Evento
            <span></span>
          </Link>
        </div>
        <ul id="events">
          {events.map(event => (
            <li key={event.id}>
              <button
                onClick={handleDelete}
                id="delete"><img
                src={trashIcon}
                alt="Deletar"/>
              </button>

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

              <Link to={`/event/${event.id}`}>Abrir</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Prinipal;
