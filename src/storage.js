// everything is saved in the browser, no account needed

export function loadResults(day) {
  const saved = JSON.parse(localStorage.getItem('today') || 'null');
  return saved && saved.day === day ? saved.results : [];
}

export function saveResults(day, results) {
  localStorage.setItem('today', JSON.stringify({ day, results }));
}

// streak = days played in a row
export function loadStats() {
  return JSON.parse(localStorage.getItem('stats') || 'null') || { streak: 0, best: 0, lastDay: 0, played: 0 };
}

export function finishDay(day) {
  const stats = loadStats();
  if (stats.lastDay === day) return stats; // already counted

  stats.streak = stats.lastDay === day - 1 ? stats.streak + 1 : 1;
  stats.best = Math.max(stats.best, stats.streak);
  stats.lastDay = day;
  stats.played += 1;
  localStorage.setItem('stats', JSON.stringify(stats));
  return stats;
}
