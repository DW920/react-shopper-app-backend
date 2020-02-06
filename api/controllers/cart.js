const debug = require('debug')('app:controllers:cart');
const cartService = require('../services/cart');

/**
 * Route handler to concatenate the desired items to the user's
 * cart
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const addItems = async (req, res) => {
  const { user: { username }, body: { items: newItems } } = req;
  debug('Adding', newItems, 'to the cart for user', username);
  const currentItems = await cartService.getCart(username)
    .then((cartData) => cartData)
    .catch(() => ([]));

  const formattedItems = newItems.map(({ name, cost }) => ({ name, cost: Number(cost) }));
  const desiredCartItems = currentItems.concat(formattedItems);
  await cartService.setItems({ username, items: desiredCartItems });

  const totalCost = desiredCartItems.reduce((acc, { cost }) => acc + cost, 0);

  res.status(200).json({ items: desiredCartItems, totalCost });
};

/**
 * Router handler function to retrieve the user's cart items
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getCart = async (req, res) => {
  const { user: { username } } = req;
  const items = await cartService.getCart(username)
    .then((cartData) => cartData)
    .catch(() => ([]));

  // Do some computation, like totaling the cost...
  const totalCost = items.reduce((acc, { cost }) => acc + cost, 0);

  res.status(200).json({ items, totalCost });
};

module.exports = { addItems, getCart };
