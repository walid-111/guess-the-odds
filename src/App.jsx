import { useEffect, useState } from 'react';
import './App.css';
import Question from './components/Question';
import Summary from './components/Summary';
import { loadResults, saveResults, finishDay } from './storage';

function App() {
  const [day, setDay] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [results, setResults] = useState([]);

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
      <h1>Guess The Odds</h1>
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
      {questions.length > 0 && !current && <Summary results={results} />}
    </>
  );
}

export default App;
