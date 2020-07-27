import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import api from '../../Services/api';
import './style.css';

function Event() {
  const { id } = useParams();

  const [ inviteds, setInviteds ] = useState([]);
  const [ gifts, setGifts ] = useState([]);
  const [ services, setServices ] = useState([]);
  const [eventName, setEventName ] = useState([])

  useEffect(() => {
    api.get(`events/${id}/inviteds`).then(response => {
      setInviteds(response.data.slice(0, 5));
    });

    api.get(`events/${id}/gifts`).then(response => {
      setGifts(response.data.slice(0, 5));
    });

    api.get(`events/${id}/services`).then(response => {
      setServices(response.data.services.slice(0, 5));
    });

    api.get(`events`).then(response => {
      setEventName(response.data.filter(event => event.id === +id)[0].event);
    });
  }, [id]);

  localStorage.clear()
  localStorage.setItem('eventName', eventName);

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
        {inviteds.map(invited => (
          <li key={invited.id}>
            <p>{invited.name}</p>
          </li>
        ))}

          <li key="0"> ... </li>
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
        {gifts.map(gift => (
          <li key={gift.id}>
            <p>{gift.product}</p>
            <p>confirmado: <strong>{gift.confirmed? 'Sim': 'Não'}</strong></p>
          </li>
        ))}

         <li key="0"> ... </li>
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
        {services.map(service => (
          <li>
            <p>{service.service}</p>
          </li>
        ))}

          <li key="0"> ... </li>
        </ul>

        <Link id="open-list" to={`${id}/services`}>Ver Lista</Link>
      </section>

    </div>
    </div>
  )
}

export default Event;
