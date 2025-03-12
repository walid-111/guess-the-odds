import { useEffect, useState } from 'react';
import './App.css';
import Question from './components/Question';

function App() {
  const [day, setDay] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('/api/today')
      .then(res => res.json())
      .then(data => {
        setDay(data.day);
        setQuestions(data.questions);
      });
  }, []);

  return (
    <>
      <h1>Guess The Odds</h1>
      {day && <p>#{day}</p>}
      {questions.map(q => (
        <Question key={q.id} question={q} />
      ))}
    </>
  );
}

export default App;
