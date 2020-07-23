import React from 'react';
import { Link, useParams } from 'react-router-dom';

import './style.css';

const convidados = [
  {
    id: 1,
    name: "Jorge",
    confirmed: false,
    eventid: 2,
    gift: {
      id: 1,
      product: 'Geladeira',
    }
  },
  {
    id: 2,
    name: "JUAUM",
    confirmed: false,
    eventid: 2,
    gift: {}
  },
  {
    id: 3,
    name: "Victor Gustavo",
    confirmed: false,
    eventid: 2,
    gift: {}
  },
  {
    id: 4,
    name: "Jorge",
    confirmed: false,
    eventid: 2,
    gift: {}
  },
  {
    id: 5,
    name: "JUAUM",
    confirmed: false,
    eventid: 2,
    gift: {}
  },
  {
    id: 6,
    name: "Victor Gustavo",
    confirmed: false,
    eventid: 2,
    gift: {}
  },
];

const presentes = [
  {
    id: 1,
    product: "Liquidificador",
    confirmed: false,
    eventid: 2
  },
  {
    id: 2,
    product: "Geladeira",
    confirmed: false,
    eventid: 2
  },
];

const servicos = {
  services: [
    {
      id: 6,
      service: "Buffet",
      provider: "Vagabunda",
      pricing: "60.00",
      confirmed: false,
      eventid: 2
    },
    {
      id: 8,
      service: "Mordomos",
      provider: "Serventia Vagabunda",
      pricing: "55.99",
      confirmed: false,
      eventid: 2
    },
    {
      id: 6,
      service: "Buffet",
      provider: "Vagabunda",
      pricing: "60.00",
      confirmed: false,
      eventid: 2
    },
    {
      id: 8,
      service: "Mordomos",
      provider: "Serventia Vagabunda",
      pricing: "55.99",
      confirmed: false,
      eventid: 2
    },
    {
      id: 6,
      service: "Buffet",
      provider: "Vagabunda",
      pricing: "60.00",
      confirmed: false,
      eventid: 2
    },
    {
      id: 8,
      service: "Mordomos",
      provider: "Serventia Vagabunda",
      pricing: "55.99",
      confirmed: false,
      eventid: 2
    }
  ],
  totalPricing: 115.99000000000001
}

function Lists() {
  const { list } = useParams();

  const pageName = list === 'inviteds' ? 'Convidados' : (list === 'gifts'? 'Presentes':'Serviços');

  function listToShow() {
    if(list === 'inviteds') {
      return convidados.slice(0);
    } else if (list === 'gifts') {
      return presentes.slice(0);
    } else {
      let servicesList = servicos.services.slice(0);
      servicesList.push(servicos.totalPricing);
      return servicesList;
    }
  }

  function showList() {
    return listToShow().map((item) => {
      if(pageName === 'Convidados') {
        return (
        <li key={item.id}>
          <div id="data">
            <strong>Nome:</strong> {item.name}

            <strong title="Participação no evento">Part. confirmada:</strong>
            <strong> {item.confirmed? 'Sim' : 'Não'}</strong>

            <strong>Presente:</strong> {item.gift.id? item.gift.product: 'Nenhum'}
          </div>

          <Link to={`${list}/${item.id}`}>Editar</Link>
        </li>
        );
      }

      else if(pageName === 'Presentes') {
        return (
          <li key={item.id}>
            <div id="data">
              <strong>Nome:</strong> {item.product}

              <strong title="Algum convidado ja confirmou o presente">Confirmado:</strong><strong> {item.confirmed? 'Sim' : 'Não'}</strong>
            </div>

            <Link to={`${list}/${item.id}`}>Editar</Link>
          </li>
        );
      }

      else {
        if (isNaN(item)) {
          return (
            <li key={item.id}>
              <div id="data">
                <strong>Nome:</strong> {item.service}

                <strong>Prestador:</strong> {item.provider}

                <strong>Confirmado:</strong><strong> {item.confirmed? 'Sim' : 'Não'}</strong>

                <strong>Valor:</strong><strong> {item.pricing}</strong>
              </div>

              <Link to={`${list}/${item.id}`}>Editar</Link>
            </li>
          );
        }
        return '';
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

          <Link to={`/event/${localStorage.getItem('eventId')}`}>
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
            <strong>{listToShow().length}</strong>
          </div>

          {!isNaN(listToShow()[listToShow().length-1])? (
              <div
                id="total-price"
                key={listToShow()[listToShow().length-1].id + 1}
              >
                <div>
                <strong>Valor total dos serviços:</strong>
                <strong>{
                  listToShow()[listToShow().length-1]
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
