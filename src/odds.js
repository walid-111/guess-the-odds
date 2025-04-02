// the slider goes from 1 in 1 to 1 in a trillion, on a log scale
// (each step multiplies the odds instead of adding to them)
export const MAX_POWER = 12;

// slider value (0 to 12) -> odds, rounded to 2 significant digits so it looks nice
export function sliderToOdds(value) {
  const odds = Math.pow(10, value);
  if (odds < 10) return Math.round(odds * 10) / 10;
  return Number(odds.toPrecision(2));
}

// 2.5 -> "1 in 2.5", 1500 -> "1 in 1,500", 3600000 -> "1 in 3.6 million"
export function formatOdds(odds) {
  const units = [
    [1e12, 'trillion'],
    [1e9, 'billion'],
    [1e6, 'million'],
  ];
  for (const [size, name] of units) {
    if (odds >= size) return `1 in ${Number((odds / size).toPrecision(3))} ${name}`;
  }
  return `1 in ${odds.toLocaleString('en-US', { maximumFractionDigits: odds < 10 ? 2 : 1 })}`;
}

// emoji + message for a score
export function verdict(score) {
  if (score === 100) return { emoji: '🟩', text: 'Perfect!', color: '#4ADE80' };
  if (score >= 80) return { emoji: '🟩', text: 'Nailed it!', color: '#4ADE80' };
  if (score >= 50) return { emoji: '🟨', text: 'Not bad!', color: '#FACC15' };
  return { emoji: '🟥', text: 'Way off...', color: '#F87171' };
}

// to get a feel for big numbers: 1 in 1,024 = 10 heads in a row
export function coinFlips(odds) {
  const flips = Math.round(Math.log2(odds));
  if (flips < 1) return 'Almost a sure thing';
  if (flips === 1) return 'Like calling a coin flip right';
  return `Like flipping ${flips} heads in a row 🪙`;
}
