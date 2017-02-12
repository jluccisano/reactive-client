import React, {Component} from 'react';
import SocketClient from './socket.js';

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
        <SocketClient/>
        <div>
          <img style={styles.logo} src="https://github.com/jluccisano/jluccisano.github.io/raw/master/assets/images/reactive-architecture.png"/>
        </div>
      </div>
    );
  }
}
