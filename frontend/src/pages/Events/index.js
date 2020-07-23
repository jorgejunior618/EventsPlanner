import React from 'react';
import { useParams, Link } from 'react-router-dom';

import './style.css';

let evento = {
  id: 1,
  event: 'Aniversário da Bia',
  inviteds: [
    {
      id: 1,
      name: "Jorge",
      confirmed: false,
      eventid: 2,
      gift: {}
    },
    {
      id: 2,
      name: "JUAUM",
      confirmed: false,
      eventid: 2,
      gift: {}
    },
    {
      id: 3,
      name: "Victor Gustavo",
      confirmed: false,
      eventid: 2,
      gift: {}
    },
    {
      id: 1,
      name: "Jorge",
      confirmed: false,
      eventid: 2,
      gift: {}
    },
    {
      id: 2,
      name: "JUAUM",
      confirmed: false,
      eventid: 2,
      gift: {}
    },
    {
      id: 3,
      name: "Victor Gustavo",
      confirmed: false,
      eventid: 2,
      gift: {}
    },
    {
      id: 1,
      name: "Jorge",
      confirmed: false,
      eventid: 2,
      gift: {}
    },
    {
      id: 2,
      name: "JUAUM",
      confirmed: false,
      eventid: 2,
      gift: {}
    },
    {
      id: 3,
      name: "Victor Gustavo",
      confirmed: false,
      eventid: 2,
      gift: {}
    },
  ],
  gifts: [
    {
      id: 1,
      product: "Liquidificador",
      confirmed: false,
      eventid: 2
    },
    {
      id: 2,
      product: "Geladeira",
      confirmed: false,
      eventid: 2
    },
  ],
}

function Event() {
  const { id } = useParams();

  localStorage.setItem('eventId', evento.id);
  localStorage.setItem('eventName', evento.event);

  return (
    <div>
    <Link to="/">
      <h1>Events Planner</h1>
    </Link>

    <div className="content" id="event">
      <div id="head">
        <h2>{localStorage.getItem('eventName')}</h2>

        <Link to="/">
          <span></span>
          Voltar para Home
        </Link>
      </div>

      <section id="inviteds">
        <div id="manage-list">
          <h3>Lista de Convidados</h3>

          <Link id="create" to={`${id}/inviteds/new`}>
            Adicionar Convidado
            <span></span>
          </Link>
        </div>

        <ul>
        {evento.inviteds.map(invited => (
          <li key={evento.id}>
            <p>{invited.name}</p>
          </li>
        ))}
        <li key="10"> ... </li>
        </ul>

        <Link id="open-list" to={`${id}/inviteds`}>Ver Lista</Link>
      </section>

      <section id="gifts">
        <div id="manage-list">
          <h3>Lista de Presentes</h3>

          <Link id="create" to={`${id}/gifts/new`}>
            Adicionar Presente
            <span></span>
          </Link>
        </div>

        <ul>
        {evento.gifts.map(gift => (
          <li>
            <p>{gift.product}</p>
            <p>confirmado: <strong>{gift.confirmed? 'Sim': 'Não'}</strong></p>
          </li>
        ))}
        </ul>

        <Link id="open-list" to={`${id}/gifts`}>Ver Lista</Link>
      </section>

      <section id="services">
        <div id="manage-list">
          <h3>Serviços contratados</h3>

          <Link id="create" to={`${id}/services/new`}>
            Adicionar Serviço
            <span></span>
          </Link>
        </div>

        <ul>
        {evento.inviteds.map(invited => (
          <li>
            <p>{invited.name}</p>
          </li>
        ))}
        </ul>

        <Link id="open-list" to={`${id}/services`}>Ver Lista</Link>
      </section>

    </div>
    </div>
  )
}

export default Event;
