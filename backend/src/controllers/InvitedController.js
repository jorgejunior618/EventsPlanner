const configDb = require('../config/database');
const { query } = require('../config/database');

exports.read = async (req, res) => {
  const { eventid } = req.params;

  const { rows: inviteds } = await configDb
    .query(
      'SELECT * FROM inviteds WHERE eventid = $1 ORDER BY name ASC',
      [eventid]
    );

  const { rows: gifts } = await configDb
    .query('SELECT * FROM gifts WHERE eventid = $1', [eventid]);

  let invitedWihGifts = inviteds.map((invited) => {
    const { id, name, confirmed, giftid, eventid } = invited;
    if(giftid) {
      const [ gift ] = gifts.filter(g => g.id === giftid);
      return {
        id,
        name,
        confirmed,
        eventid,
        gift: gift,
      }
    }
    return { id, name, confirmed, eventid, gift: {} };
  });

  return res.json(invitedWihGifts);
}

exports.create = async (req, res) => {
  const { name, confirmed, giftid } = req.body;
  const { eventid } = req.params;

  console.log(confirmed, typeof confirmed)

  try {
    const response = await configDb
      .query(
        'INSERT INTO inviteds (name, giftid, confirmed, eventid) VALUES($1, $2, $3, $4)',
        [name, giftid, confirmed, eventid]
      );

    return res.json({
      success: `Invitation to ${name} succescully created`,
    });
  }
  catch(e) {
    return(res.json({
      error: `Error on table: ${e.table}, column: ${e.column} when creating invite`,
      e
    }));
  }
}

exports.update = async (req, res) => {
  const { eventid, id } = req.params;
  const { name, confirmed, giftid } = req.body;

  const { rows: invitedToUpdate } = await configDb.
    query(
      'SELECT * FROM inviteds WHERE id =$1 AND eventid = $2',
      [id, eventid]
    );

  const actualgiftId = invitedToUpdate[0].giftid;

  const response = await configDb
    .query(
      'UPDATE inviteds SET name = $1, confirmed = $2, giftid = $3 WHERE id = $4 AND eventid = $5',
      [name, confirmed, giftid, id, eventid]
    );

  if(giftid && actualgiftId !== giftid) {
    const giftResponseSetTrue = await configDb
      .query(
        'UPDATE gifts SET confirmed = TRUE WHERE id = $1 AND eventid = $2',
        [giftid, eventid]
    );

    const giftResponseSetFalse = await configDb
      .query(
        'UPDATE gifts SET confirmed = FALSE WHERE id = $1 AND eventid = $2',
        [actualgiftId, eventid]
    );
  } else if (!giftid && actualgiftId !== giftid) {
    const giftResponse = await configDb
      .query(
        'UPDATE gifts SET confirmed = FALSE WHERE id = $1 AND eventid = $2',
        [actualgiftId, eventid]
    );
  }

  return res.json({
    success: 'Invited successfuly updated.',
  });
}

exports.delete = async (req, res) => {
  const { eventid, id } = req.params;

  const { rows: invitedToDelete } = await configDb
    .query(
      'SELECT * FROM inviteds WHERE id = $1 AND eventid = $2',
      [id, eventid]
    );

  if (invitedToDelete[0].giftid) {
    const responseGifts = await configDb
      .query(
        'UPDATE gifts SET confirmed = FALSE WHERE id = $1',
        [invitedToDelete[0].giftid]
    );
  }

  try {
    const response = await configDb
      .query('DELETE FROM inviteds WHERE id = $1', [id]);

    return res.json({
      success: 'Invited successfuly deleted.',
    });
  } catch(e) {
    return res.json({
      error: 'Error deleting invited.',
    });
  }
}
