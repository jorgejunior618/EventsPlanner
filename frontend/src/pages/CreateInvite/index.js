import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';

import api from '../../Services/api';
import './style.css';

function CreateInvite() {
  const history = useHistory();
  const { id, action } = useParams();

  const [ gifts, setGifts ] = useState([]);

  const [ name, setName ] = useState(
    (action === 'new') ? '' :
    localStorage.getItem('invitedName')
  );
  const [ confirmed, setConfirmed ] = useState(
    (action === 'new') ? false :
    localStorage.getItem('invitedConfirmed')
  );
  const [ giftid, setGiftId ] = useState(
    (action === 'new') ? 0 :
    localStorage.getItem('invitedGiftid')
  );

  useEffect(() => {
    api.get(`events/${id}/gifts`).then(response => {
      setGifts(response.data.filter(gift => (action === 'new') ? !gift.confirmed : (!gift.confirmed || +giftid === gift.id)));
    });
  }, [id, action, giftid]);

  async function handleNewInvited(event) {
    event.preventDefault();

    const invitedId = localStorage.getItem('idToUpdate');

    const data = {
      name,
      confirmed: ('' + confirmed).startsWith('true'),
      giftid: ('' + giftid).startsWith('undefined') ? null : giftid
    }

    console.log(data)
    console.log(data.giftid, typeof data.giftid)

    try {
      (action === 'new')
      ? await api.post(`events/${id}/inviteds`, data)
      : await api.put(`events/${id}/inviteds/${+invitedId}`, data);

      alert('Convidado criado com sucesso');
      history.push(`/event/${id}/inviteds`);
    } catch (e) {
      alert('Erro na criação do convidado, tente novamente')
    }
  }

  return (
    <div>
      <Link to="/">
        <h1>Events Planner</h1>
      </Link>

      <div className="content" id="create-invited">
        <div id="head">
          <h2>{localStorage.getItem('eventName')}</h2>

          <Link to={`/event/${id}`}>
            <span></span>
            Pagina do evento
          </Link>
        </div>
        <form onSubmit={handleNewInvited}>
          <h3>Criar/Atualizar Convidado</h3>

          <div className="field" id="name">
            <label htmlFor="name">Nome do Convidado:</label>

            <input
              type="text"
              name="name"
              id="name"
              placeholder="Insira o nome completo do convidado"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>

          <div className="field" id="confirmation">
            <label htmlFor="confirmation">Confirmação de Presença:</label>

            <input
              type="checkbox"
              name="confirmation"
              id="confirmation"
              checked={confirmed ? ('' + confirmed).startsWith('true') : false}
              onChange={e => setConfirmed(e.target.checked)}
            />
          </div>

          <div className="field" id="gift">
            <label htmlFor="gift">Presente:</label>
            <select
              name="gift"
              id="gift"
              defaultValue="0"
              onChange={e => setGiftId(+e.target.options[e.target.selectedIndex].value)}
            >
              <option value="0">Selecione o Presente</option>
              {gifts.map(gift => (
                <option
                  value={gift.id}
                  selected={gift.id === +giftid}
                >{gift.product}</option>
              ))}
            </select>
          </div>

          <button type="submit">Criar</button>

        </form>
      </div>

    </div>
  )
}

export default CreateInvite;
