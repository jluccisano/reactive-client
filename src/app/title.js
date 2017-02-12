import React, {Component} from 'react';
import ReactiveMeteoStation from './components/reactiveMeteoStation.js';

const styles = {
  title: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#4f7dcf',
    color: 'white'
  },
  h1: {
    fontWeight: 300,
    fontSize: '3rem',
    margin: '1rem'
  },
  logo: {
    height: '24rem',
    backgroundColor: 'white',
    borderRadius: '1rem',
    margin: '1rem'
  },
  overview: {
    width: '100%',
    height: '100%',
    borderRadius: '1rem',
    margin: '1rem'
  },
  h2: {
    fontWeight: 300,
    fontSize: '2rem',
    margin: '.5rem'
  }
};

export class Title extends Component {
  render() {
    return (
      <div style={styles.title}>
        <h1 style={styles.h1}>Reactive Client</h1>
        <ReactiveMeteoStation/>
        <div>
          <img style={styles.overview} src="https://github.com/jluccisano/jluccisano.github.io/raw/develop/assets/images/reactive-architecture.png"/>
        </div>
      </div>
    );
  }
}
