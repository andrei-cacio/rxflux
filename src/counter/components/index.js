import React, { Component } from 'react';
import Immutable from 'immutable';
import core from '../../rxflux/core';
import * as counterActions from '../actions';
import counterStore from '../store';

const observableCounterStore = core.createStore(counterStore);
const style = {
  container: {
    margin: '0 auto',
    width: '175px',
    marginTop: '270px'
  },
  button: {
    padding: '9px',
    width: '55px',
    height: '97px'
  },
  counter: {
    fontSize: '67px',
    padding: '10px',
    backgroundColor: 'coral',
    color: 'white'
  }
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: Immutable.fromJS({ counter: 0 })
    }
  }

  increment() {
    counterActions.increment();
  }

  decrement() {
    counterActions.decrement();
  }

  componentDidMount() {
    observableCounterStore.subscribe(newState => {
      this.setState({ data: newState });
    });
  }

  render() {
    return (
      <div style={style.container}>
        <div style={{ display: 'flex' }}>
          <button style={style.button} onClick={this.decrement}>-</button>
          <span style={style.counter}>
            {this.state.data.get('counter')}
          </span>
          <button style={style.button} onClick={this.increment}>+</button>
        </div>
      </div>
    )
  }
};

