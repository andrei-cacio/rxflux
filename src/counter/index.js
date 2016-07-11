import core from '../rxflux/core';
import { increment, decrement } from './actions';
import counterStore from './store';

const observableCounterStore = core.createStore(counterStore);
observableCounterStore.subscribe(newState => console.log(newState));

increment();
increment();
decrement();
