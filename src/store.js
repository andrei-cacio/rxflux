import { BehaviorSubject } from 'rxjs';
import Immutable from 'immutable';
import dispatcher from './dispatcher';
import uuid from 'uuid';

let globalState = Immutable.fromJS({
  stores: {},
  state: {}
});

export default function createStore(obj) {
  const storeId = uuid.v4();
  const initialState = Immutable.fromJS(obj.initialState);
  const stateSubject = new BehaviorSubject(initialState);

  globalState = globalState
    .update('stores', stores => stores.set(storeId, obj))
    .update('state', state => state.set(storeId, initialState));

  dispatcher.subscribe(actionDispatch => {
    const prevState = globalState.get('state').get(storeId);
		if (obj.actionMap.hasOwnProperty(actionDispatch.action)) {
			const newState = obj.actionMap[actionDispatch.action](prevState, actionDispatch.payload);

      globalState = globalState.update('state', state => state.update(storeId, store => store.merge(newState)));
	    stateSubject.next(newState);
	  }
	});

	return stateSubject;
}
