const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
app.use(cors());
app.use(express.json());

const START_DATE = new Date('2025-03-01T00:00:00Z').getTime();

app.get('/questions', (req, res) => {
  const now = Date.now();
  const daysPassed = Math.floor((now - START_DATE) / (1000 * 60 * 60 * 24));

  const firstQuestion = daysPassed * 2 + 1;
  const secondQuestion = firstQuestion + 1;

  db.all(
    "SELECT * FROM questions WHERE id BETWEEN ? AND ?",
    [firstQuestion, secondQuestion],
    (err, rows) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (rows.length === 0) {
        return res.status(404).send("No questions available for today");
      }
      res.json(rows);
    }
  );
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});