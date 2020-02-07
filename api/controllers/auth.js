const { pick } = require('lodash');
const userService = require('../services/users');
const jwt = require('../services/jwt');

const login = async (req, res) => {
  
  // eslint-disable-next-line no-unused-vars
  const { body: { username, password } } = req;
  /* TODO: Verify that a user exists in the database with the given username
   * and password combination
   *
   * i.e. userService.getUser(username) to retrieve a possible user for the username,
   * verify it exists, then compare the password on file
   */

  return userService.getUser(username)
    .then((user) => {
      // TODO: You'd want to compare the passwords on file... otherwise there's no auth layer
      /* Only return the details we need, otherwise we start leaking data like
       * hashed passwords (or in our case unhashed passwords!!)
       */
      const userDetails = pick(user, ['name', 'username']);
      const authToken = jwt.createToken({ username });
     
      // sess = req.session;
      // sess.token = authToken;
      res.cookie('session', authToken).status(200).json(userDetails);
    })
    .catch(() => res.sendStatus(401));
};

// const logout = (req, res) => {
//   req.session.destroy(function(err){
//     if(err){
//         console.log(err);
//     } else {
//         res.redirect('/');
//     }
// });
// }

module.exports = {
  login,
  // logout
};
