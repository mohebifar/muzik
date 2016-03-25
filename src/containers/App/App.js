import React, { Component, PropTypes } from 'react';
import 'themes/default.scss';
import styles from './App.scss';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import MenuIcon from 'material-ui/lib/svg-icons/navigation/menu';
import { Link } from 'react-router';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    const { children } = this.props;

    return (<div>
      <AppBar
        title={<span>Muzik</span>}
        showMenuIconButton={false}
        iconElementRight={<Link to="/"><IconButton><MenuIcon/></IconButton></Link>}
      />
      <div className={styles.container}>
        {children}
      </div>
    </div>);
  }
}
