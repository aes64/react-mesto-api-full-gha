export function renderLoading(isLoading, button, replacement, text) {
  if (isLoading) {
    button.textContent = replacement;
  } else {
    button.textContent = text;
  }
}