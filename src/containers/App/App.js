import React, { Component, PropTypes } from 'react';
import 'themes/default.scss';
import styles from './App.scss';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    const { children } = this.props;

    return (<div className={styles.container}>
      {children}
    </div>);
  }
}
