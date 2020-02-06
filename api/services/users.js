const axios = require('axios');
const config = require('config');

/**
 * Sends a user's registration information to the mock database and returns
 * the desired registration information upon successful insertion
 * @param registrationInformation
 * @returns {Promise<Object>}
 */
const createUser = async (registrationInformation) => {
  const { username } = registrationInformation;
  return axios
    .post(`${config.api.database}/users/${username}`, registrationInformation)
    .then(({ data }) => data);
};

/**
 * Retrieves user details from the mock database based on a given username
 * @param username
 * @returns {Promise<Object>}
 */
const getUser = async (username) => axios.get(`${config.api.database}/users/${username}`)
  .then(({ data }) => data);

module.exports = { createUser, getUser };
