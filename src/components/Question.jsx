import { useState } from 'react';
import { MAX_POWER, sliderToOdds, formatOdds } from '../odds';

function Question({ question }) {
  const [value, setValue] = useState(3);
  const guess = sliderToOdds(value);

  return (
    <div className="question">
      <p>{question.question}</p>
      <p className="odds">{formatOdds(guess)}</p>
      <input
        type="range"
        min="0"
        max={MAX_POWER}
        step="0.01"
        value={value}
        onChange={e => setValue(Number(e.target.value))}
      />
    </div>
  );
}

export default Question;
