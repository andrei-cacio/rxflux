import { BehaviorSubject } from 'rxjs';
import Immutable from 'immutable';
import dispatcher from './dispatcher';
import { basicCacheCreate } from './cache';

const fluxCache = basicCacheCreate();

export default function createStore(name, config) {
  const initialState = Immutable.fromJS(config.initialState);
  const stateSubject = new BehaviorSubject(initialState);

  fluxCache.setState({ name, initialState });

  dispatcher.subscribe(actionDispatch => {
    const prevState = fluxCache.getState().get(name);

		if (config.actionMap.hasOwnProperty(actionDispatch.action)) {
			const newState = config.actionMap[actionDispatch.action](prevState, actionDispatch.payload);

      fluxCache.updateState({ name, newState });
	    stateSubject.next(newState);
	  }
	});

	return stateSubject;
}

export function evaluateGetter(getter) {
  const [path, handler] = getter;

  const getterValue = fluxCache.getIn(path);
  return handler.call(null, getterValue);
}

