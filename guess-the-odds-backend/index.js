const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
app.use(cors());
app.use(express.json());

const START_DATE = Date.UTC(2025, 2, 1); // day #1 = March 1st 2025
const DAY = 24 * 60 * 60 * 1000;
const PER_DAY = 2;

// same day number for everyone, changes at midnight UTC
function todayNumber() {
  return Math.floor((Date.now() - START_DATE) / DAY) + 1;
}

app.get('/api/today', (req, res) => {
  const day = todayNumber();

  db.get('SELECT COUNT(*) AS count FROM questions', (err, row) => {
    if (err) return res.status(500).json({ error: 'database error' });

    // day 1 = questions 1 and 2, day 2 = 3 and 4... and back to the start when there's no more
    const ids = [];
    for (let i = 0; i < PER_DAY; i++) ids.push(((day - 1) * PER_DAY + i) % row.count + 1);

    // no answers here, they're only sent after guessing
    db.all('SELECT id, question FROM questions WHERE id IN (' + ids.map(() => '?').join(', ') + ')', ids, (err, questions) => {
      if (err) return res.status(500).json({ error: 'database error' });
      res.json({ day, questions });
    });
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
