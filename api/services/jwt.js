const jwt = require('jsonwebtoken');

const SECRET_KEY = 'thisShouldBeAPrivateKeyYouInjectWhenYouDeploy';

const verifyToken = (token) => jwt.verify(token, SECRET_KEY);

const createToken = (data) => jwt.sign(data, SECRET_KEY);

console.log(SECRET_KEY);
module.exports = { createToken, verifyToken };
