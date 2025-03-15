import { useState } from 'react';
import { MAX_POWER, sliderToOdds, formatOdds, verdict } from '../odds';

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
      <p className="question-text">{question.question}</p>

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
        <div className="result">
          <p className="verdict" style={{ color: verdict(result.score).color }}>
            {verdict(result.score).emoji} {verdict(result.score).text} {result.score}/100
          </p>
          <p className="label">Real odds</p>
          <p className="odds">{formatOdds(result.answer)}</p>
          <p className="label">You said {formatOdds(result.guess)}</p>
          <p className="explanation">{result.explanation}</p>
          <button onClick={() => onDone(result)}>Next</button>
        </div>
      )}
    </div>
  );
}

export default Question;
