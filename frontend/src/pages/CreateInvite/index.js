import React from 'react';
import { Link } from 'react-router-dom';

import './style.css';

function CreateInvite() {
  return (
    <div>
      <Link to="/">
        <h1>Events Planner</h1>
      </Link>

      <div className="content" id="create-invited">
        <div id="head">
          <h2>{localStorage.getItem('eventName')}</h2>

          <Link to={`/event/${localStorage.getItem('eventId')}`}>
            <span></span>
            Pagina do evento
          </Link>
        </div>
        <form>
          <h3>Criar/Atualizar Convidado</h3>

          <div className="field" id="name">
            <label htmlFor="name">Nome do Convidado:</label>

            <input
              type="text"
              name="name"
              id="name"
              placeholder="Insira o nome completo do convidado"
            />
          </div>

          <div className="field" id="confirmation">
            <label htmlFor="confirmation">Confirmação de Presença:</label>

            <input
              type="checkbox"
              name="confirmation"
              id="confirmation"
            />
          </div>

          <div className="field" id="gift">
            <label htmlFor="gift">Presente:</label>
            <select name="gift" id="gift">
              <option value="">Selecione o Presente</option>
            </select>
          </div>

          <button type="submit">Criar</button>

        </form>
      </div>

    </div>
  )
}

export default CreateInvite;
