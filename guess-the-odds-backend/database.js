const sqlite3 = require('sqlite3').verbose();
const questions = require('./questions.json');

const db = new sqlite3.Database('odds.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS questions (
      id INTEGER PRIMARY KEY,
      question TEXT NOT NULL,
      answer REAL NOT NULL,
      explanation TEXT NOT NULL
    )
  `);

  // ids are fixed (1, 2, 3...) so the questions of each day never change
  const insert = db.prepare('INSERT OR REPLACE INTO questions (id, question, answer, explanation) VALUES (?, ?, ?, ?)');
  questions.forEach((q, i) => insert.run(i + 1, q.question, q.answer, q.explanation));
  insert.finalize();
});

module.exports = db;
