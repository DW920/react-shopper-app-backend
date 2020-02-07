const { Router } = require('express');
const balanceController = require('../controllers/balance');
const authentication = require('../middleware/auth');

const router = Router();

router.get('/', authentication, balanceController.getBalance);
router.post('/', authentication, balanceController.setBalance);

// TODO: Add more methods like, checking out or removing specific items!
// i.e. router.post('/checkout', cartController.checkout)
// router.del('/:itemId', cartController.remoteItemById);

module.exports = router;
