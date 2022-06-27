function saveStrategyToLocalStorage(strategy) {
  const strategies = JSON.parse(localStorage.getItem('strategies')) || [];
  strategies.push(strategy);
  localStorage.setItem('strategies', JSON.stringify(strategies));
}

export { saveStrategyToLocalStorage };
