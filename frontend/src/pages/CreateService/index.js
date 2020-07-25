import React from 'react';
import { Link } from 'react-router-dom';
import CurrenyInput from 'react-currency-input';

import './style.css';

function CreateEvent() {
  // alert(localStorage.getItem('idToUpdate'))

  return (
    <div>
      <Link to="/">
        <h1>Events Planner</h1>
      </Link>

      <div className="content" id="create-service">
        <div id="head">
          <h2>{localStorage.getItem('eventName')}</h2>

          <Link to={`/event/${localStorage.getItem('eventId')}`}>
            <span></span>
            Pagina do evento
          </Link>
        </div>
        <form>
          <h3>Criar/Atualizar Serviço</h3>

          <div className="field" id="name">
            <label htmlFor="service">Serviço:</label>

            <input
              type="text"
              name="service"
              id="service"
              placeholder="Ex.: Buffet, Espaço/Salão"
            />
          </div>

          <div className="field" id="provider">
            <label htmlFor="service">Provedro do Serviço:</label>

            <input
              type="text"
              name="provider"
              id="provider"
              placeholder="Insira o nome do Provedor deste serviço"
            />
          </div>

          <div className="field" id="price">
            <label htmlFor="price">Valor do Serviço (R$):</label>

            <CurrenyInput
              decimalSeparator=","
              thousandSeparator="."
              name="price"
              id="price"
            />
          </div>

          <button type="submit">Criar</button>

        </form>
      </div>

    </div>
  )
}

export default CreateEvent;
