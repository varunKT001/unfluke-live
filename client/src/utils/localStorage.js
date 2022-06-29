import { v4 } from 'uuid';

function saveStrategyToLocalStorage(strategy) {
  const strategies = JSON.parse(localStorage.getItem('strategies')) || [];
  strategies.push({ id: v4(), ...strategy });
  localStorage.setItem('strategies', JSON.stringify(strategies));
  return { message: 'Strategy saved' };
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
  return { message: 'Strategy removed' };
}

function updateStrategyInLocalStorage({ id, state }) {
  const strategies = JSON.parse(localStorage.getItem('strategies')) || [];
  const indexOfStrategy = strategies.findIndex((s) => s.id === id);
  strategies[indexOfStrategy] = { id, ...state };
  localStorage.setItem('strategies', JSON.stringify(strategies));
  return { message: 'Strategy updated' };
}

function toggleStrategyStatusInLocalStorage(id) {
  const strategies = JSON.parse(localStorage.getItem('strategies')) || [];
  const indexOfStrategy = strategies.findIndex((s) => s.id === id);
  strategies[indexOfStrategy].status =
    strategies[indexOfStrategy].status === 'active' ? 'disabled' : 'active';
  localStorage.setItem('strategies', JSON.stringify(strategies));
  return { message: `Strategy ${strategies[indexOfStrategy].status}` };
}

export {
  saveStrategyToLocalStorage,
  getStrategiesFromLocalStorage,
  deleteStrategiesFromLocalStorage,
  updateStrategyInLocalStorage,
  toggleStrategyStatusInLocalStorage,
};
