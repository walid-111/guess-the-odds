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
      <p className="emojis">{emojis}</p>
      <div className="stats">
        <div><b>{stats.streak}</b> 🔥 streak</div>
        <div><b>{stats.best}</b> best</div>
        <div><b>{stats.played}</b> played</div>
      </div>
      <button onClick={share}>{copied ? 'Copied!' : 'Share'}</button>
      <Countdown />
    </div>
  );
}

export default Summary;
