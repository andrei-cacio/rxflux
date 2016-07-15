import * as actions from './actions';
import * as actionTypes from './action-types';
import core from '../../rxflux/core';
import counterStore from './store';

const store = core.createStore(counterStore);

export { actions, actionTypes, store };
