import React, {Component} from 'react';

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#1f1f1f'
  },
  title: {
    flex: 1,
    fontSize: '1.5rem',
    margin: '1rem'
  },
  date: {
    flex: 1,
    textAlign: 'right',
    margin: '1rem',
    color: 'white'
  }
};

export class Header extends Component {
  render() {
    return (
      <header style={styles.header}>
        <p style={styles.title}>
          <a href="#" target="_blank">
            Reactive client
          </a>
        </p>
        <p style={styles.date}>

        </p>
      </header>
    );
  }
}
