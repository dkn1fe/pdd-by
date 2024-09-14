const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const jsonFilePath = path.join(__dirname, '../data/storage.json');

router.get('/', (req, res) => {
  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data' });
    }

    try {
      const question = JSON.parse(data);
      res.json(question);
    } catch (parseError) {
      res.status(500).json({ error: 'Failed to parse data' });
    }
  });
});

module.exports = router;
