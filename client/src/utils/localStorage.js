function saveStrategyToLocalStorage(strategy) {
  const strategies = JSON.parse(localStorage.getItem('strategies')) || [];
  strategies.push(strategy);
  localStorage.setItem('strategies', JSON.stringify(strategies));
  return strategies;
}

function getStrategiesFromLocalStorage() {
  return JSON.parse(localStorage.getItem('strategies')) || [];
}

function deleteStrategiesFromLocalStorage(IDs) {
  const strategies = JSON.parse(localStorage.getItem('strategies')) || [];
  const newStrategies = strategies.filter(
    (strategy) => !IDs.includes(strategy.id)
  );
  localStorage.setItem('strategies', JSON.stringify(newStrategies));
  return newStrategies;
}

function updateStrategyInLocalStorage({ id, state }) {
  const strategies = JSON.parse(localStorage.getItem('strategies')) || [];
  const indexOfStrategy = strategies.findIndex((s) => s.id === id);
  strategies[indexOfStrategy] = state;
  localStorage.setItem('strategies', JSON.stringify(strategies));
  return strategies;
}

function toggleStrategyStatusInLocalStorage(id) {
  const strategies = JSON.parse(localStorage.getItem('strategies')) || [];
  const indexOfStrategy = strategies.findIndex((s) => s.id === id);
  strategies[indexOfStrategy].status =
    strategies[indexOfStrategy].status === 'active' ? 'disabled' : 'active';
  localStorage.setItem('strategies', JSON.stringify(strategies));
  return strategies;
}

export {
  saveStrategyToLocalStorage,
  getStrategiesFromLocalStorage,
  deleteStrategiesFromLocalStorage,
  updateStrategyInLocalStorage,
  toggleStrategyStatusInLocalStorage,
};
