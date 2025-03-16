import { useEffect, useState } from 'react';
import './App.css';
import Question from './components/Question';
import Summary from './components/Summary';

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
          onDone={result => setResults([...results, result])}
        />
      )}
      {questions.length > 0 && !current && <Summary results={results} />}
    </>
  );
}

export default App;
