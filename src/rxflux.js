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
