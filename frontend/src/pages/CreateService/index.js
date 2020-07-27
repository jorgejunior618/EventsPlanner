import React, { useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';

import api from '../../Services/api';
import './style.css';
import CurrencyInput from 'react-currency-input';

function CreateEvent() {
  const history = useHistory();
  const { id, action } = useParams();

  const [ service , setService ] = useState(
    (action === 'new') ?
    '' : localStorage.getItem('serviceName')
  );
  const [ provider , setProvider ] = useState(
    (action === 'new') ?
    '' : localStorage.getItem('serviceProvider')
  );
  const [ pricing , setPricing ] = useState(
    (action === 'new') ?
    0 : +localStorage.getItem('servicePricing')
  );
  const [ confirmed , setConfirmed ] = useState(
    (action === 'new') ?
    false : localStorage.getItem('serviceConfirmed')
  );

  async function handleNewService(event) {
    event.preventDefault();

    const data = {
      service,
      provider,
      pricing,
      confirmed
    }

    try {
      (action === 'new') ?
        await api.post(`events/${id}/services`, data) :
        await api.put(`events/${id}/services/${localStorage.getItem('idToUpdate')}`, data);

      alert('Serviço adicionado com sucesso');

      history.push(`/event/${id}/services`);
    } catch (e) {
      alert('Erro ao criar serviço, tente novamente');
    }
  }

  return (
    <div>
      <Link to="/">
        <h1>Events Planner</h1>
      </Link>

      <div className="content" id="create-service">
        <div id="head">
          <h2>{localStorage.getItem('eventName')}</h2>

          <Link to={`/event/${id}`}>
            <span></span>
            Pagina do evento
          </Link>
        </div>
        <form onSubmit={handleNewService}>
          <h3>Criar/Atualizar Serviço</h3>

          <div className="field" id="name">
            <label htmlFor="service">Serviço:</label>

            <input
              type="text"
              name="service"
              id="service"
              placeholder="Ex.: Buffet, Espaço/Salão"
              value={service}
              onChange={e => setService(e.target.value)}
              required
            />
          </div>

          <div className="field" id="provider">
            <label htmlFor="service">Provedor do Serviço:</label>

            <input
              type="text"
              name="provider"
              id="provider"
              placeholder="Insira o nome do Provedor deste serviço"
              value={provider}
              onChange={e => setProvider(e.target.value)}
              required
            />
          </div>

          <div className="field" id="double">
            <div className="subfield">
            <label htmlFor="price">Valor do Serviço (R$):</label>

            <CurrencyInput
              decimalSeparator=","
              thousandSeparator="."
              name="price"
              id="price"
              value={pricing}
              onChange={e => setPricing(+e.split('.').join('').split(',').join('.'))}
            />
            </div>
            <div className="subfield">
              <label htmlFor="confirmation">Confirmação do Serviço:</label>

              <input
                type="checkbox"
                name="confirmation"
                id="confirmation"
                checked={confirmed}
                onChange={e => setConfirmed(e.target.value)}
              />
            </div>
          </div>

          <button type="submit">Criar</button>

        </form>
      </div>

    </div>
  )
}

export default CreateEvent;
