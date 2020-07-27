import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../Services/api';
import './style.css';
import trashIcon from '../../assets/trash.svg'

function Prinipal() {
  const history = useHistory();

  const [ events, setEvents ] = useState([]);

  useEffect(()=> {
    api.get('events').then(response => {
      setEvents(response.data);
    })
  }, [])

  localStorage.clear();

  async function handleDelete(id) {
    await api.delete(`events/${id}`);

    alert('Contato excluído com sucesso!');

    setEvents(events.filter(event => event.id !== id))
  }

  function handleUpdateEvent(eventId, eventName, eventDate) {
    localStorage.setItem('eventToUpdateId', eventId);
    localStorage.setItem('eventToUpdateName', eventName);
    localStorage.setItem('eventToUpdateDate', eventDate.split('/').reverse().join('-'));

    history.push('events/update')
  }

  return (
    <div>
      <Link to="/">
        <h1>Events Planner</h1>
      </Link>

      <div className="content">
        <div id="head">
          <h2>Sua Lista de Eventos</h2>

          <Link id="create" to="events/new">
            Adicionar Evento
            <span></span>
          </Link>
        </div>
        <ul id="events">
          {(events.length) ?
            events.map(event => (
              <li key={event.id}>
                <button
                  onClick={() => handleDelete(event.id)}
                  id="delete"><img
                  src={trashIcon}
                  alt="Deletar"/>
                </button>

                <div id="event-data">
                  <h3>
                    {event.event}
                    <button onClick={() => handleUpdateEvent(event.id, event.event, event.date)}>Editar</button>
                  </h3>

                  <dl>
                    <dt>Quantidade de convidados</dt>
                    <dd>{event.eventData.invitedsLength}</dd>
                    <dt>Presentes na lista</dt>
                    <dd>{event.eventData.giftsLength}</dd>
                    <dt>Serviços contratados</dt>
                    <dd>{event.eventData.servicesLength}</dd>
                    <dt>Data marcada</dt>
                    <dd><strong>{event.date}</strong></dd>
                  </dl>
                </div>

                <Link to={`/event/${event.id}`}>Abrir</Link>
              </li>
            )) :
            (
              <div id="no-itens">
                <h3>Ainda não há eventos cadastrados</h3>
                <h3>Clique em <strong>Adicionar evento</strong> para iniciar</h3>
              </div>
            )}
        </ul>
      </div>
    </div>
  )
}

export default Prinipal;
