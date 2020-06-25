let inviteds = [
  {
    id: 1,
    name: 'Victor Bellmont',
    confirmed: false,
    giftId: null,
  },
  {
    id: 2,
    name: 'Victor Gustavo',
    confirmed: false,
    giftId: 1,
  },
];

let gifts = [
  {
    id: 1,
    product: 'Liquidificador',
    confirmed: false
  }
];

exports.read = (req, res) => {
  let invitedWihGifts = inviteds.map((invited) => {
    const { id, name, confirmed } = invited;
    if(invited.giftId) {
      const [ gift ] = gifts.filter(g => g.id === invited.giftId);
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
