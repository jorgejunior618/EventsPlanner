const configDb = require('../config/database');

exports.read = async (req, res) => {
  const { rows: events } = await configDb
  .query('SELECT * FROM events ORDER BY event ASC');

  const { rows: inviteds } = await configDb
  .query('SELECT * FROM inviteds');

  const { rows: gifts } = await configDb
  .query('SELECT * FROM gifts');

  const { rows: services } = await configDb
  .query('SELECT * FROM services');

  let eventsComplete = events.map(evnt => {
    const { id, event, date } = evnt;
    const invitedsLength = inviteds.filter(invited => invited.eventid === id).length;
    const giftsLength = gifts.filter(gifts => gifts.eventid === id).length;
    const servicesLength = services.filter(service => service.eventid === id).length;

    return {
      id,
      event,
      date,
      eventData: {
        invitedsLength,
        giftsLength,
        servicesLength,
      },
    }
  });

  return res.json(eventsComplete);
}

exports.create = async (req, res) => {
  const { event, date } = req.body;

  try {
    const response = await configDb
    .query(
      'INSERT INTO events (event, date) VALUES($1, $2)',
      [event, date]
    );

    return res.json({ success: 'Event successfuly created' });
  } catch(e) {
    return res.json(e);
  }
}

exports.update = async (req, res) => {
  const { event, date } = req.body;
  const { id } = req.params;

  try {
    const response = await configDb
    .query(
      'UPDATE events SET event = $1, date = $2 WHERE id = $3',
      [event, date, id]
    )

    return res.json({ success: 'Event successfuly updated' });
  } catch(e) {
    return res.json(e);
  }
}

exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await configDb
    .query('DELETE FROM events WHERE id = $1', [id]);

    return res.json(response);
  } catch(e) {
    return res.json(e)
  }
}
