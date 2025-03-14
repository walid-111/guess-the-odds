import { useState } from 'react';
import { MAX_POWER, sliderToOdds, formatOdds } from '../odds';

function Question({ question, onDone }) {
  const [value, setValue] = useState(3);
  const [result, setResult] = useState(null);
  const guess = sliderToOdds(value);

  function submit() {
    fetch('/api/answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: question.id, guess }),
    })
      .then(res => res.json())
      .then(data => setResult({ ...data, guess }));
  }

  return (
    <div className="question">
      <p>{question.question}</p>

      {!result && (
        <>
          <p className="odds">{formatOdds(guess)}</p>
          <input
            type="range"
            min="0"
            max={MAX_POWER}
            step="0.01"
            value={value}
            onChange={e => setValue(Number(e.target.value))}
          />
          <button onClick={submit}>Guess</button>
        </>
      )}

      {result && (
        <>
          <p>Your guess: {formatOdds(result.guess)}</p>
          <p className="odds">{formatOdds(result.answer)}</p>
          <p>{result.score} / 100</p>
          <p>{result.explanation}</p>
          <button onClick={() => onDone(result)}>Next</button>
        </>
      )}
    </div>
  );
}

export default Question;
