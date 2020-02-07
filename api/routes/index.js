const { Router } = require('express');
const cartRouter = require('./cart');
const userRouter = require('./users');
const balanceRouter = require('./balance');
const authController = require('../controllers/auth');

const router = Router();

/**
 * Debug route to check if server is up
 */
router.get('/ping', (req, res) => {
  res.status(418).send('pong');
});

/**
 * Route used to login and authenticate a user
 */
router.post('/login', authController.login);

/**
 * Namespaced router for cart routes
 */
router.use('/cart', cartRouter);

router.use('/balance', balanceRouter);

/**
 * Namespaced router so all routes in the userRouter will fall under the namespace
 * api/user/{routeName}
 */
router.use('/user', userRouter);

module.exports = router;
