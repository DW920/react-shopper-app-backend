const { Router } = require('express');
const cartController = require('../controllers/cart');
const authentication = require('../middleware/auth');

const router = Router();

router.get('/', authentication, cartController.getCart);
router.post('/', authentication, cartController.addItems);

// TODO: Add more methods like, checking out or removing specific items!
// i.e. router.post('/checkout', cartController.checkout)
// router.del('/:itemId', cartController.remoteItemById);

module.exports = router;
