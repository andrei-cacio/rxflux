import React, { Component } from 'react';
import Immutable from 'immutable';
import * as counter from '../modules/counter';

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
    counter.actions.increment();
  }

  decrement() {
    counter.actions.decrement();
  }

  componentDidMount() {
    counter.store.subscribe(newState => {
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

