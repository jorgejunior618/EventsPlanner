const configDb = require('../config/database');

exports.read = async (req, res) => {
  const { eventid } = req.params;
  const { rows: services } = await configDb
    .query(
      'SELECT * FROM services WHERE eventid = $1 ORDER BY service ASC',
      [eventid]
    );

  const totalPricing = services
  .reduce((acumulator, service) => acumulator + Number(service.pricing), 0);

  return res.json({
    services,
    totalPricing,
  });
};

exports.create = async (req, res) => {
  const { eventid } = req.params;
  const { service, provider, pricing, confirmed } = req.body;

  if (pricing < 100000) {
    const response = await configDb
      .query(
      'INSERT INTO services (service, provider, pricing, eventid, confirmed) VALUES($1, $2, $3, $4, $5)',
      [service, provider, pricing, eventid, confirmed]
    );

    return res.json({
      success: 'Service successfully registered.',
    });
  }
  return res.json({
    error: 'Service can`t cost more than R$ 99,999.99 .',
  });
};

exports.update = async (req, res) => {
  const { eventid, id } = req.params;
  const { service, provider, pricing, confirmed } = req.body;

  const { rows } = await configDb
    .query(
      'SELECT * FROM services WHERE id = $1 AND eventid = $2',
      [id, eventid]
    );

  const oldService = rows[0];

  const response = await configDb
    .query(
    'UPDATE services SET service = $1, provider = $2, pricing = $3, confirmed =$4 WHERE id = $5 AND eventid = $6',
    [
      service || oldService.service,
      provider || oldService.provider,
      pricing || oldService.pricing,
      confirmed,
      id,
      eventid
    ]
  )

  return res.json({
    success: 'Service successfully altered.',
  });
};

exports.delete = async (req, res) => {
  const { eventid, id } = req.params;

  const response = await configDb
    .query(
      'DELETE FROM services WHERE id = $1 AND eventid = $2',
      [id, eventid]
    );

  if(response.rowCount) {
    return res.json({
      success: 'Service successfully deleted.'
    })
  }

  return res.json({
    error: 'Error deleting service.'
  });
};
