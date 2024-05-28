const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const authenticate = require('../middleware/authenticate');

router.get('/', itemController.getItems);
router.get('/:id', itemController.getItem);
router.post('/', authenticate, itemController.createItem);
router.put('/:id', authenticate, itemController.updateItem);
router.delete('/:id', authenticate, itemController.deleteItem);

module.exports = router;
