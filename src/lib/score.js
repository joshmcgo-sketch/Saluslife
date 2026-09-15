// Semantic colour mapping for scores and line-item statuses.
// Green = pass/clean, amber = watch/marginal, coral = warning/fail.

export const STATUS = {
  pass: { color: '#3F8F5E', label: 'Pass', dot: 'bg-pass' },
  watch: { color: '#B07D1E', label: 'Watch', dot: 'bg-watch' },
  fail: { color: '#C6503A', label: 'Flag', dot: 'bg-fail' },
}

export function scoreColor(score) {
  if (score >= 85) return '#3F8F5E'
  if (score >= 70) return '#B07D1E'
  return '#C6503A'
}

export function scoreBand(score) {
  if (score >= 85) return 'Strong'
  if (score >= 70) return 'Acceptable'
  return 'Below bar'
}
