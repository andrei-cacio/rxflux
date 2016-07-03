const dispatchSubject = new Rx.Subject();

//action-types
const INCREMENT = 'increment';
const DECREMENT = 'decrement';

//actions
function increment() {
	dispatchSubject.next({
		action: INCREMENT
	});
}

function decrement() {
	dispatchSubject.next({
		action: DECREMENT
	});
}

//store
const counterStore = {
	initialState: Immutable.fromJS({
		counter: 0
	}),
	actionMap: {
		[INCREMENT]: doIncrement,
		[DECREMENT]: doDecrement
	}
}

function doIncrement(state) {
	return state.update('counter', counter => ++counter);
}

function doDecrement(state) {
	return state.update('counter', counter => --counter);
}

//componnent
const observableCounterStore = createStore(counterStore)
observableCounterStore.subscribe(newState => console.log(newState.toJS()));

increment();
increment();
increment();
increment();

decrement();
decrement();


//core
function createStore(obj) {
	const stateSubject = new Rx.BehaviorSubject(obj.initialState);

	dispatchSubject.subscribe(actionDispatch => {
		if (obj.actionMap.hasOwnProperty(actionDispatch.action)) {
			obj.initialState = obj.actionMap[actionDispatch.action](obj.initialState, actionDispatch.payload);
	    stateSubject.next(obj.initialState);
	  }
	});

	return stateSubject;
}
