import { BehaviorSubject } from 'rxjs';
import Immutable from 'immutable';
import dispatcher from './dispatcher';

let globalState = Immutable.fromJS({
  stores: {},
  state: {}
});

export default function createStore(name, obj) {
  const initialState = Immutable.fromJS(obj.initialState);
  const stateSubject = new BehaviorSubject(initialState);

  globalState = globalState
    .update('stores', stores => stores.set(name, obj))
    .update('state', state => state.set(name, initialState));

  dispatcher.subscribe(actionDispatch => {
    const prevState = globalState.get('state').get(storeId);
		if (obj.actionMap.hasOwnProperty(actionDispatch.action)) {
			const newState = obj.actionMap[actionDispatch.action](prevState, actionDispatch.payload);

      globalState = globalState
        .update('state', state => state.update(storeId, store => store.merge(newState)));
      
	    stateSubject.next(newState);
	  }
	});

	return stateSubject;
}
