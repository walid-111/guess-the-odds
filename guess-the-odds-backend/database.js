const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('odds.db');
const fs = require('fs'); // File System

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            question TEXT NOT NULL,
            answer TEXT NOT NULL,
            explanation TEXT NOT NULL,
        )
    `);
    db.run("DELETE FROM questions");
    const lines = fs.readFileSync('questions.txt', 'utf-8').split('\n');
    lines.forEach(line => {
        if (line) {
            const [question, answer, explanation] = line.split(',');
            db.run(
                "INSERT INTO questions (question, answer, explanation) VALUES (?, ?, ?)",
                [question, answer, explanation]
            );
        }
    });
});

module.exports = db;