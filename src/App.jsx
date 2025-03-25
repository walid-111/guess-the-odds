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
  // show the rules the first time someone comes
  const [showHelp, setShowHelp] = useState(!localStorage.getItem('stats') && !localStorage.getItem('today'));

  useEffect(() => {
    fetch('/api/today')
      .then(res => res.json())
      .then(data => {
        setDay(data.day);
        setQuestions(data.questions);
        setResults(loadResults(data.day)); // already played today? (page refreshed)
      });
  }, []);

  // one question at a time
  const current = questions[results.length];

  return (
    <>
      <header>
        <h1>Guess The Odds</h1>
        <button className="help" onClick={() => setShowHelp(true)}>?</button>
      </header>
      {showHelp && <HowToPlay onClose={() => setShowHelp(false)} />}
      {day && <p className="day">#{day}</p>}
      {current && (
        <Question
          key={current.id}
          question={current}
          onDone={result => {
            const newResults = [...results, result];
            setResults(newResults);
            saveResults(day, newResults);
            if (newResults.length === questions.length) finishDay(day);
          }}
        />
      )}
      {questions.length > 0 && !current && <Summary day={day} results={results} />}
    </>
  );
}

export default App;
