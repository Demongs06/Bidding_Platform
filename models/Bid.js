const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Item = require('./Item');

const Bid = sequelize.define('Bid', {
  item_id: {
    type: DataTypes.INTEGER,
    references: { model: Item, key: 'id' },
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: { model: User, key: 'id' },
    allowNull: false
  },
  bid_amount: { type: DataTypes.DECIMAL, allowNull: false },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = Bid;
