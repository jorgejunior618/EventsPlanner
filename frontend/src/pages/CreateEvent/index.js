import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react'

import './style.css';

function CreateEvent() {
  function handleNewEvent(event) {
    event.preventDefault();
    const dataEvent = document.querySelector('input#date').value;
    alert(typeof dataEvent)
  }
  const [eventData, setdata] = useState('');
  const [eventName, setName] = useState('Novo Evento');

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
            />
          </div>

          <div className="field" id="date">
            <label htmlFor="date">Data do evento:</label>

            <input
              type="date"
              name="date"
              id="date"
              value={eventData}
              onChange={e => setdata(e.target.value)}
            />
          </div>

          <button type="submit">Criar</button>

        </form>
      </div>

    </div>
  )
}

export default CreateEvent;
