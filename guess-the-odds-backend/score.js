// score out of 100, based on how many orders of magnitude the guess is off
// exact = 100, 10x off = 60, 100x off = 20, more = 0
function score(guess, answer) {
  const off = Math.abs(Math.log10(guess) - Math.log10(answer));
  return Math.max(0, Math.round(100 - off * 40));
}

module.exports = score;
