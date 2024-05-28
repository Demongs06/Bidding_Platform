const Bid = require('../models/Bid');
const Item = require('../models/Item');
const Notification = require('../models/Notification');
const User = require('../models/User');

exports.getBids = async (req, res) => {
  try {
    const bids = await Bid.findAll({ where: { item_id: req.params.itemId } });
    res.json(bids);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.placeBid = async (req, res) => {
  const { bid_amount } = req.body;
  try {
    const item = await Item.findByPk(req.params.itemId);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    if (bid_amount <= item.current_price) {
      return res.status(400).json({ error: 'Bid amount must be higher than current price' });
    }

    const bid = await Bid.create({
      item_id: req.params.itemId,
      user_id: req.user.id,
      bid_amount,
      created_at: new Date()
    });

    item.current_price = bid_amount;
    await item.save();

    // Notify item owner
    const itemOwner = await User.findByPk(item.user_id);
    await Notification.create({
      user_id: itemOwner.id,
      message: `Your item "${item.name}" received a new bid.`,
      is_read: false,
      created_at: new Date()
    });

    // Notify previous highest bidder (if any)
    const previousBid = await Bid.findOne({
      where: { item_id: req.params.itemId },
      order: [['bid_amount', 'DESC']]
    });
    if (previousBid && previousBid.user_id !== req.user.id) {
      await Notification.create({
        user_id: previousBid.user_id,
        message: `You have been outbid on item "${item.name}".`,
        is_read: false,
        created_at: new Date()
      });
    }

    res.status(201).json(bid);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
