import { useEffect, useState } from 'react';

// time left until midnight UTC (new questions)
function timeLeft() {
  const now = new Date();
  const midnight = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1);
  const s = Math.floor((midnight - now) / 1000);
  const pad = n => String(n).padStart(2, '0');
  return `${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`;
}

function Countdown() {
  const [left, setLeft] = useState(timeLeft());

  useEffect(() => {
    const timer = setInterval(() => setLeft(timeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return <p className="explanation">Next questions in <b>{left}</b></p>;
}

export default Countdown;
