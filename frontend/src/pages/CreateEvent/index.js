import React, { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import api from '../../Services/api';
import './style.css';

function CreateEvent() {
  const history = useHistory();
  const { action } = useParams()

  const [eventName, setName] = useState(
    (action === 'new') ? 'Novo Evento' : localStorage.getItem('eventToUpdateName')
  );
  const [eventDate, setDate] = useState(
    (action === 'new') ? 'Novo Evento' : localStorage.getItem('eventToUpdateDate')
  );
  const today = new Date().toISOString().split('T')[0];

  async function handleNewEvent(event) {
    event.preventDefault();

    const date = eventDate.split('-').reverse().join('/');

    const eventData = {
      event: eventName,
      date,
    }

    try {
      const response = (action === 'new') ?
        await api.post('events', eventData) :
        await api.put(`events/${localStorage.getItem('eventToUpdateId')}`, eventData);

      alert(`Evento ${eventData.event} criado com sucesso`);
      localStorage.clear();

      history.push('/');
    } catch(e) {
      alert('Erro na criação do event, tente novamente');
    }
  }

  return (
    <div>
      <Link to="/">
        <h1>Events Planner</h1>
      </Link>

      <div className="content" id="create-event">
        <div id="head">
          <h2>{eventName}</h2>

          <Link to={'/'}>
            <span></span>
            Voltar para a Home
          </Link>
        </div>
        <form onSubmit={handleNewEvent}>
          <h3>Criar/Atualizar Evento</h3>

          <div className="field" id="name">
            <label htmlFor="name">Evento:</label>

            <input
              type="text"
              name="name"
              id="name"
              value={eventName}
              onChange={e => setName(e.target.value)}
              placeholder='Ex.: "Aniversário de Fulano", "Casamento"'
              required
            />
          </div>

          <div className="field" id="date">
            <label htmlFor="date">Data do evento:</label>

            <input
              type="date"
              min={today}
              name="date"
              id="date"
              value={eventDate}
              onChange={e => setDate(e.target.value)}
              required
            />
          </div>

          <button type="submit">Criar</button>

        </form>
      </div>

    </div>
  )
}

export default CreateEvent;
