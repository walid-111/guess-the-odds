import { useEffect, useState } from 'react';
import './App.css';

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
        <p key={q.id}>{q.question}</p>
      ))}
    </>
  );
}

export default App;
