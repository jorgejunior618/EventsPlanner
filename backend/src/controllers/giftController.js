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

exports.read =  (req, res) => {
  return res.json(gifts);
}
