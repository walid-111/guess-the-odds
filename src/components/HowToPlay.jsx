function HowToPlay({ onClose }) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="question" onClick={e => e.stopPropagation()}>
        <h2>How to play</h2>
        <p>Every day, 2 new questions about the odds of something happening.</p>
        <p>Move the slider to guess: is it 1 in 10? 1 in a million?</p>
        <p>The closer you are, the more points you get (100 max). Being 10 times off still gives you 60.</p>
        <p>🟩 close &nbsp; 🟨 not bad &nbsp; 🟥 way off</p>
        <button onClick={onClose}>Let's go</button>
      </div>
    </div>
  );
}

export default HowToPlay;
