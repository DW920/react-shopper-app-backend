const { Router } = require('express');
const cartController = require('../controllers/cart');
const authentication = require('../middleware/auth');
const balanceController = require('../controllers/balance');
const router = Router();

router.get('/', authentication, cartController.getCart);
router.post('/', authentication, cartController.addItems);
router.post('/remove', authentication, cartController.removeItems);
router.post('/empty', authentication, cartController.emptyItems);
router.post('/checkout', authentication, balanceController.setBalance);

// TODO: Add more methods like, checking out or removing specific items!
// i.e. router.post('/checkout', cartController.checkout)
// router.del('/:itemId', cartController.remoteItemById);

module.exports = router;
