import { verdict } from '../odds';

function Summary({ results }) {
  const total = results.reduce((sum, r) => sum + r.score, 0);
  const max = results.length * 100;

  return (
    <div className="question summary">
      <p className="label">Today's score</p>
      <p className="odds">{total} / {max}</p>
      <p className="emojis">{results.map(r => verdict(r.score).emoji).join(' ')}</p>
      <p className="explanation">Come back tomorrow for 2 new questions!</p>
    </div>
  );
}

export default Summary;
