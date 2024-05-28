const express = require('express');
const router = express.Router();
const bidController = require('../controllers/bidController');
const authenticate = require('../middleware/authenticate');

router.get('/:itemId', bidController.getBids);
router.post('/:itemId', authenticate, bidController.placeBid);

module.exports = router;
