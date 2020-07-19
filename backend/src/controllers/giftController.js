const configDb = require('../config/database');

exports.read = async (req, res) => {
  const { eventid } = req.params;

  const { rows: gifts } = await configDb
    .query(
      'SELECT * FROM gifts WHERE eventid = $1 ORDER BY product ASC',
      [eventid]
    );

  return res.json(gifts);
}

exports.create = async (req, res) => {
  const { eventid } = req.params;
  const { product } = req.body;

  try {
    const response = await configDb
      .query(
      'INSERT INTO gifts (product, eventid) VALUES($1, $2)',
      [product, eventid]
    );

    return res.json({
      success: `${product} succescully added to list`,
    });
  }
  catch(e) {
    return(res.json({
      e,
    }));
  }
}

exports.update = async (req, res) => {
  const { eventid, id } = req.params;
  const { product } = req.body;

  const response = await configDb
    .query(
      'UPDATE gifts SET product = $1 WHERE id = $2 AND eventid = $3',
      [product, id, eventid]
    );

  return res.json({
    success: 'Gift successfully updated.'
  })
}


exports.delete = async (req, res) => {
  const { eventid, id } = req.params;

  const response = await configDb
    .query(
      'DELETE FROM gifts WHERE id = $1 AND eventid = $2',
      [id, eventid]
    );

  const invitedResponse = await configDb
    .query(
      'UPDATE inviteds SET giftid = 0 WHERE giftid = $1 AND eventid = $2',
      [id, eventid]
    );

  return res.json({
    success: 'Gift successfully removed from the list.'
  })
}
