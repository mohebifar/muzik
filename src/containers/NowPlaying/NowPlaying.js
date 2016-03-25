import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Player from 'components/Player/Player';
import Playlist from 'components/Playlist/Playlist';
import { loadAlbumSongs } from 'redux/modules/playlist';
import { browserHistory } from 'react-router';

@connect(
  state => ({
    song: state.player.currentSong,
    albumsLoaded: state.playlist.loaded
  }),
  {loadAlbumSongs}
)
export default class NowPlaying extends Component {
  static propTypes = {
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }),
    albumsLoaded: PropTypes.bool.isRequired,
    loadAlbumSongs: PropTypes.func.isRequired
  };

  componentWillMount() {
    const { albumsLoaded } = this.props;

    if (!albumsLoaded) {
      browserHistory.push('/');
    } else {
      this.props.loadAlbumSongs(this.props.params.id);
    }
  }

  render() {
    const { song } = this.props;

    return (<div>
      {
        song ?
          <Player /> :
          null
      }
      <Playlist />
    </div>);
  }
}
