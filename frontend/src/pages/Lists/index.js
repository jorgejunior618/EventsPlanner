import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import './style.css';
import trashIcon from '../../assets/trash.svg';
import api from '../../Services/api';

function Lists() {
  const { id, list } = useParams();

  const pageName = list === 'inviteds' ? 'Convidados' : (list === 'gifts'? 'Presentes':'Serviços');

  const [ pageList, setPageList ] = useState(
    (list === 'services') ? { services: [{id:0}], totalPricing: 0 } : []
  );

  useEffect(() => {
    api.get(`events/${id}/${list}`).then(response => {
      setPageList(response.data)
    });
  }, []);

  localStorage.removeItem('idToUpdate');

  async function handleDelete(itemId) {
    await api.delete(`events/${id}/${list}/${itemId}`);

    alert(pageName.slice(0, pageName.length-1) + ' exculido com sucesso');

    if (list === 'services') {
      const deletedPrice = +pageList.services.filter(item => item.id === itemId)[0].pricing;

      setPageList({
        services: pageList.services.filter(item => item.id !== itemId),
        totalPricing: pageList.totalPricing - deletedPrice
      });
    }
    else {
      setPageList(pageList.filter(item => item.id !== itemId));
    }
  }

  function handleUpdate(id) {
    localStorage.setItem('idToUpdate', id);
  }

  function showList() {
    if(list === 'services') {
      return pageList.services.map(item => (
        <li key={item.id}>
          <button
            onClick={() => handleDelete(item.id)}
            id="delete">
              <img
                src={trashIcon}
                alt="Deletar"
              />
          </button>

          <div id="data">
            <strong>Nome:</strong> {item.service}

            <strong>Prestador:</strong> {item.provider}

            <strong>Confirmado:</strong><strong> {item.confirmed? 'Sim' : 'Não'}</strong>

            <strong>Valor:</strong><strong> {item.pricing}</strong>
          </div>

          <Link onClick={() => handleUpdate(item.id)} to={`${list}/update`}>Editar</Link>
        </li>
      ));
    }

    return pageList.map((item) => {
      if(list === 'inviteds') {
        return (
        <li key={item.id}>
          <button
            onClick={() => handleDelete(item.id)}
            id="delete">
              <img
                src={trashIcon}
                alt="Deletar"
              />
          </button>

          <div id="data">
            <strong>Nome:</strong> {item.name}

            <strong title="Participação no evento">Part. confirmada:</strong>

            <strong> {item.confirmed? 'Sim' : 'Não'}</strong>

            <strong>Presente:</strong> {item.gift.id ? item.gift.product : 'Nenhum'}
          </div>

          <Link onClick={() => handleUpdate(item.id)} to={`${list}/update`}>Editar</Link>
        </li>
        );
      }

      else if(list === 'gifts') {
        return (
          <li key={item.id}>
            <button
              onClick={handleDelete}
              id="delete">
                <img
                  src={trashIcon}
                  alt="Deletar"
                />
            </button>

            <div id="data">
              <strong>Nome:</strong> {item.product}

              <strong title="Algum convidado ja confirmou o presente">Confirmado:</strong>
              <strong> {item.confirmed? 'Sim' : 'Não'}</strong>
            </div>

            <Link onClick={() => handleUpdate(item.id)} to={`${list}/update`}>Editar</Link>
          </li>
        );
      }
    })
  }

  return (
    <div>
      <Link to="/">
        <h1>Events Planner</h1>
      </Link>

      <div className="content" id="list">
        <div id="head">
          <h2>{localStorage.getItem('eventName')}</h2>

          <Link to={`/event/${id}`}>
            <span></span>
            Pagina do evento
          </Link>
        </div>

        <section>
          <div id="manage-list">
            <h3>Lista de {pageName}</h3>

            <Link id="create" to={`${list}/new`}>
              Novo
              <span></span>
            </Link>
          </div>

          <ul>
            {showList()}
          </ul>

          <div id="list-count">
            <strong>Total de {pageName}: </strong>
            <strong>{(list ==='services') ? pageList.services.length: pageList.length}</strong>
          </div>

          {(list ==='services')? (
              <div
                id="total-price"
                key={pageList.services[pageList.services.length-1].id + 1}
              >
                <div>
                <strong>Valor total dos serviços:</strong>
                <strong>{
                  pageList.totalPricing
                  .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                }</strong>
                </div>
              </div>
            ): ''}
        </section>
      </div>
    </div>
  )
}

export default Lists;
