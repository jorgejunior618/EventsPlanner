import React, { useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';

import api from '../../Services/api';
import './style.css';

function CreateGift() {
  const history = useHistory();
  const { id, action } = useParams();

  const [ product, setProduct ] = useState(
    (action === 'new') ?
    '' : localStorage.getItem('giftProduct')
  );

  async function handleNewGift(event) {
    event.preventDefault();

    const data = {
      product,
    }

    try {
      (action === 'new') ?
        await api.post(`events/${id}/gifts`, data) :
        await api.put(`events/${id}/gifts/${localStorage.getItem('idToUpdate')}`, data);

      alert('Presente adicionado com sucesso à lista');
      history.push(`/event/${id}/gifts`)
    } catch (e) {
      alert('Erro ao adicionar presente');
    }
  }

  return (
    <div>
      <Link to="/">
        <h1>Events Planner</h1>
      </Link>

      <div className="content" id="create-gift">
        <div id="head">
          <h2>{localStorage.getItem('eventName')}</h2>

          <Link to={`/event/${id}`}>
            <span></span>
            Pagina do evento
          </Link>
        </div>
        <form onSubmit={handleNewGift}>
          <h3>Criar/Atualizar Presente</h3>

          <div className="field" id="name">
            <label htmlFor="product">Produto:</label>

            <input
              type="text"
              name="product"
              id="product"
              placeholder="Insira o nome do produto que deseja adicionar"
              value={product}
              onChange={e => setProduct(e.target.value)}
            />
          </div>

          <button type="submit">Criar</button>

        </form>
      </div>

    </div>
  )
}

export default CreateGift;
