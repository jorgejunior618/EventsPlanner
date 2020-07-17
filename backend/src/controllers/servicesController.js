const configDb = require('../config/database');

exports.read = async (req, res) => {
  const { rows: services } = await configDb
  .query('SELECT * FROM services ORDER BY service ASC');

  console.log(services);

  const totalPricing = services
  .reduce((acumulator, service) => acumulator + Number(service.pricing), 0);

  console.log('total', totalPricing);

  return res.json({
    services,
    totalPricing,
  });
};

exports.create = async (req, res) => {
  const { service, provider, pricing, eventid } = req.body;

  if (pricing < 100000) {
    const response = await configDb
    .query(
      'INSERT INTO services (service, provider, pricing, eventid) VALUES($1, $2, $3, $4)',
      [service, provider, pricing, eventid]
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
  const { id } = req.params;
  const { service, provider, pricing, confirmed } = req.body;

  const { rows } = await configDb
  .query('SELECT * FROM services WHERE id = $1', [id]);

  const oldService = rows[0];

  const response = await configDb
  .query(
    'UPDATE services SET service = $1, provider = $2, pricing = $3, confirmed =$4 WHERE id = $5',
    [
      service || oldService.service,
      provider || oldService.provider,
      pricing || oldService.pricing,
      confirmed,
      id
    ]
  )

  return res.json({
    success: 'Service successfully altered.',
  });
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  const response = await configDb
  .query('DELETE FROM services WHERE id = $1', [id]);

  if(response.rowCount) {
    return res.json({
      success: 'Service successfully deleted.'
    })
  }

  return res.json({
    error: 'Error deleting service.'
  });
};
