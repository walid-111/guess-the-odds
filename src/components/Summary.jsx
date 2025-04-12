import { useState } from 'react';
import { verdict } from '../odds';
import { loadStats } from '../storage';
import Countdown from './Countdown';

function Summary({ day, results }) {
  const [copied, setCopied] = useState(false);
  const total = results.reduce((sum, r) => sum + r.score, 0);
  const max = results.length * 100;
  const stats = loadStats();
  const emojis = results.map(r => verdict(r.score).emoji).join(' ');

  function share() {
    const text = `Guess The Odds #${day} 🎲\n${emojis}\n${total}/${max} · 🔥 ${stats.streak}\n${window.location.origin}`;
    // phone: native share menu, computer: copy to clipboard
    if (navigator.share) {
      navigator.share({ text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      setCopied(true);
    }
  }

  return (
    <div className="question summary">
      <p className="label">Today's score</p>
      <p className="odds">{total} / {max}</p>
      <div className="recap">
        {results.map((r, i) => (
          <div key={i} className="recap-row">
            <span>{verdict(r.score).emoji}</span>
            <span className="recap-question">{r.question || `Question ${i + 1}`}</span>
            <b>{r.score} pts</b>
          </div>
        ))}
      </div>
      <div className="stats">
        <div><b>🔥 {stats.streak}</b> Current streak</div>
        <div><b>{stats.best}</b> Best streak</div>
        <div><b>{stats.played}</b> Days played</div>
      </div>
      <button onClick={share}>{copied ? 'Copied!' : 'Share'}</button>
      <Countdown />
    </div>
  );
}

export default Summary;
