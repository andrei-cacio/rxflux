import { Record, Map } from 'immutable';

const Cache = Record({ state: new Map({}) });

const fluxCache = {
  cache: new Cache(),
  getState() { return this.cache.get('state'); },
  setState({ name, initialState }) {
    this.cache = this.cache.update('state', state => state.set(name, initialState));
  }
};

export function basicCacheCreate() {
  return {
    ...fluxCache,
    updateState({ name, newState }) {
      this.cache = this.cache
        .update('state',
          state => state.update(name,
            prevState => prevState.merge(newState)));
    },
    getIn(path) {
      return this.cache.getIn(['state', ...path]);
    }
  }
}