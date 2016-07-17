import { DECREMENT, INCREMENT } from './action-types';

const counterStore = {
  initialState: { counter : 0 },
  actionMap: {
    [INCREMENT]: doIncrement,
    [DECREMENT]: doDecrement
  }
};

function doIncrement(state) { 
  return state.update('counter', counter => ++counter);
}

function doDecrement(state) {
  return state.update('counter', counter => --counter);
}

export default counterStore;
