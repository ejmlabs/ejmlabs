export function shouldRetry(attempt, elapsedMs, { maxAttempts, budgetMs }) {
  return attempt < maxAttempts && elapsedMs < budgetMs;
}
