const debug = require('debug')('app:controllers:cart');
const balanceService = require('../services/balance');
const cartService = require('../controllers/cart');
/**
 * Route handler to concatenate the desired items to the user's
 * cart
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const setBalance = async (req, res) => {
  const { user: { username }, body: { balance } } = req;
  
  debug('Setting', balance, 'for user', username);
  
  await balanceService.setBalance({ username, balance });
  await cartService.emptyItems(req, res);
  res.status(200).json({ balance });
};

/**
 * Router handler function to retrieve the user's cart items
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getBalance = async (req, res) => {
 
  const { user: { username } } = req;
  const currentBalance = await balanceService.getBalance(username)
    .then((balance) => balance)
    .catch(() => ([]));
  console.log('current balance', currentBalance)
  res.status(200).json({ balance: currentBalance });
};

module.exports = { setBalance, getBalance };
