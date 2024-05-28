const Item = require('../models/Item');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

exports.getItems = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const items = await Item.findAndCountAll({
      limit,
      offset: (page - 1) * limit
    });
    res.json(items);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getItem = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createItem = [
  upload.single('image'),
  async (req, res) => {
    const { name, description, starting_price, end_time } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;
    try {
      const item = await Item.create({
        name,
        description,
        starting_price,
        current_price: starting_price,
        image_url,
        end_time,
        created_at: new Date()
      });
      res.status(201).json(item);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
];

exports.updateItem = async (req, res) => {
  const { name, description, starting_price, end_time } = req.body;
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    if (req.user.id !== item.user_id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    item.name = name;
    item.description = description;
    item.starting_price = starting_price;
    item.end_time = end_time;
    await item.save();

    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    if (req.user.id !== item.user_id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }

    await item.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
