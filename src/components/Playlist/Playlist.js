import React, { Component, PropTypes } from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import { connect } from 'react-redux';
import { setSong } from 'redux/modules/player';
import styles from './Playlist.scss';

@connect(
  state => ({
    playlist: state.player.currentPlaylist
  }),
  {
    setSong
  }
)
export default class Playlist extends Component {
  static propTypes = {
    setSong: PropTypes.func.isRequired,
    playlist: PropTypes.array.isRequired
  };

  handleClick = (song) => () => this.props.setSong(song);

  render() {
    const { playlist } = this.props;

    return (<List className={styles.container}>
      {
        playlist.map(song =>
          <ListItem
            key={song.id}
            onClick={this.handleClick(song)}
            primaryText={song.artists[0].name}
            secondaryText={song.name}
          />)
      }
    </List>);
  }
}
