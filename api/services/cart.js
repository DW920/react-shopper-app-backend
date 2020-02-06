const axios = require('axios');
const config = require('config');

/**
 * Retrieve the cart data for a particular user
 * @param username
 * @returns {Promise<Object>}
 */
const getCart = async (username) => axios.get(`${config.api.database}/cart/${username}`)
  .then(({ data }) => data);

/**
 * Set the items in the user's cart
 * @param username
 * @param items
 * @returns {Promise<Object>}
 */
const setItems = async ({ username, items }) => axios
  .post(`${config.api.database}/cart/${username}`, items)
  .then(({ data }) => data);

module.exports = { getCart, setItems };
