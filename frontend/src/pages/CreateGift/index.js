import React from 'react';
import { Link } from 'react-router-dom';

import './style.css';

function CreateGift() {
  return (
    <div>
      <Link to="/">
        <h1>Events Planner</h1>
      </Link>

      <div className="content" id="create-gift">
        <div id="head">
          <h2>{localStorage.getItem('eventName')}</h2>

          <Link to={`/event/${localStorage.getItem('eventId')}`}>
            <span></span>
            Pagina do evento
          </Link>
        </div>
        <form>
          <h3>Criar/Atualizar Presente</h3>

          <div className="field" id="name">
            <label htmlFor="product">Produto:</label>

            <input
              type="text"
              name="product"
              id="product"
              placeholder="Insira o nome do produto que deseja adicionar"
            />
          </div>

          <button type="submit">Criar</button>

        </form>
      </div>

    </div>
  )
}

export default CreateGift;
