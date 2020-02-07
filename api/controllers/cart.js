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
  const { user: { username }, body: { itemInfo: newItems } } = req;
  
  debug('Adding', newItems, 'to the cart for user', username);
  const currentItems = await cartService.getCart(username)
    .then((cartData) => cartData)
    .catch(() => ([]));

  const formattedItems = [newItems].map(({ name, cost }) => ({ name, cost: Number(cost) }));
  const desiredCartItems = currentItems.concat(formattedItems);
  await cartService.setItems({ username, items: desiredCartItems });

  const totalCost = desiredCartItems.reduce((acc, { cost }) => acc + cost, 0);

  res.status(200).json({ items: desiredCartItems, totalCost });
};

/**
 * Route handler to remove the desired items to the user's
 * cart
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const removeItems = async (req, res) => {
  const { user: { username }, body: { itemIndex } } = req;
  
  debug('Removing', itemIndex, 'to the cart for user', username);
  console.log('itemIndex', itemIndex)
  const currentItems = await cartService.getCart(username)
    .then((cartData) => cartData)
    .catch(() => ([]));

  currentItems.splice(itemIndex, 1);
 
  await cartService.setItems({ username, items: currentItems });

  const totalCost = currentItems.reduce((acc, { cost }) => acc + cost, 0);

  res.status(200).json({ items: currentItems, totalCost });
};

/**
 * Route handler to empty the desired items to the user's
 * cart
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const emptyItems = async (req, res) => {
  const { user: { username } } = req;
  
  debug('Empty cart for user', username);
  
  await cartService.setItems({ username, items: [] });

  res.status(200).json({ items: [], totalCost: 0 });
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

module.exports = { addItems, getCart, emptyItems, removeItems };
