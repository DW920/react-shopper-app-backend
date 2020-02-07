const axios = require('axios');
const config = require('config');

/**
 * Retrieve the cart data for a particular user
 * @param username
 * @returns {Promise<Object>}
 */
const getBalance = async (username) => axios.get(`${config.api.database}/balance/${username}`)
  .then(({ data }) => {console.log('balancedata',data),data});

/**
 * Set the items in the user's cart
 * @param username
 * @param items
 * @returns {Promise<Object>}
 */
const setBalance = async ({ username, balance }) => axios
  .post(`${config.api.database}/balance/${username}`, balance)
  .then(({ data }) => data);

module.exports = { getBalance, setBalance };
