import { useEffect, useState } from 'react';
import './App.css';
import Question from './components/Question';
import Summary from './components/Summary';
import HowToPlay from './components/HowToPlay';
import { loadResults, saveResults, finishDay } from './storage';

function App() {
  const [day, setDay] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [results, setResults] = useState([]);
  const [step, setStep] = useState(0);
  const [error, setError] = useState(false);
  // show the rules the first time someone comes
  const [showHelp, setShowHelp] = useState(!localStorage.getItem('stats') && !localStorage.getItem('today'));

  useEffect(() => {
    fetch('/api/today')
      .then(res => {
        if (!res.ok) throw new Error('server error');
        return res.json();
      })
      .then(data => {
        setDay(data.day);
        setQuestions(data.questions);
        const saved = loadResults(data.day); // already played today? (page refreshed)
        setResults(saved);
        setStep(saved.length);
      })
      .catch(() => setError(true));
  }, []);

  // one question at a time
  const current = questions[step];

  return (
    <>
      <header>
        <h1>Guess The Odds</h1>
        <button className="help" onClick={() => setShowHelp(true)}>?</button>
      </header>
      {showHelp && <HowToPlay onClose={() => setShowHelp(false)} />}
      {day && <p className="day">#{day}</p>}
      {error && <p className="explanation">Can't load today's questions, try again in a bit.</p>}
      {!error && !day && <p className="explanation">Loading...</p>}
      {current && (
        <Question
          key={current.id}
          question={current}
          number={step + 1}
          total={questions.length}
          onAnswer={result => {
            const newResults = [...results, result];
            setResults(newResults);
            saveResults(day, newResults);
            if (newResults.length === questions.length) finishDay(day);
          }}
          onNext={() => setStep(step + 1)}
        />
      )}
      {questions.length > 0 && !current && <Summary day={day} results={results} />}
    </>
  );
}

export default App;
