// everything is saved in the browser, no account needed

export function loadResults(day) {
  const saved = JSON.parse(localStorage.getItem('today') || 'null');
  return saved && saved.day === day ? saved.results : [];
}

export function saveResults(day, results) {
  localStorage.setItem('today', JSON.stringify({ day, results }));
}
