import core from '../../rxflux/core';
import { DECREMENT, INCREMENT } from './action-types';

export function decrement() {
  core.dispatcher.next({
    action: DECREMENT
  });
}

export function increment() {
  core.dispatcher.next({
    action: INCREMENT
  });
}
