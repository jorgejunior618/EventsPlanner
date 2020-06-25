const configDb = require('../config/database');

exports.read = async (req, res) => {
  const { rows: inviteds } = await configDb
    .query('SELECT * FROM inviteds ORDER BY name ASC');

  const { rows: gifts } = await configDb
    .query('SELECT * FROM gifts');

  let invitedWihGifts = inviteds.map((invited) => {
    const { id, name, confirmed, giftid } = invited;
    if(giftid) {
      const [ gift ] = gifts.filter(g => g.id === giftid);
      return {
        id,
        name,
        confirmed,
        gift: gift,
      }
    }
    return { id, name, confirmed, gift: {} };
  });

  return res.json(invitedWihGifts);
}

exports.create = async (req, res) => {
  const { name, giftid } = req.body;

  try {
    const response = await configDb
    .query(
      'INSERT INTO inviteds (name, giftid) VALUES($1, $2)',
      [name, giftid]
    );

    return res.json({
      succes: `Invitation to ${name} succescully created`,
    });
  }
  catch(e) {
    return(res.json({
      error: `Error on table: ${e.table}, column: ${e.column} when creating invite`,
    }));
  }
}

exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, confirmed, giftid } = req.body;

  const response = configDb
  .query(
    'UPDATE inviteds SET name = $1, confirmed = $2, giftid = $3 WHERE id = $4',
    [name, confirmed, giftid, id]
  );

  if(giftid) {
    const giftResponse = await configDb
    .query('UPDATE gifts SET confirmed = TRUE WHERE id = $1', [giftid]);
  }

  return res.json({
    succes: 'Invited successfuly updated.',
  });
}

exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await configDb
    .query('DELETE FROM inviteds WHERE id = $1', [id]);

    return res.json({
      succes: 'Invited successfuly deleted.',
    });
  } catch(e) {
    return res.json({
      error: 'Error deleting invited.',
    });
  }
}