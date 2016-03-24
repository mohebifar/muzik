import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Player from 'components/Player/Player';

@connect(state => ({song: state.player.currentSong}))
export default class NowPlaying extends Component {
  render() {
    return (<div>
      <Player />
    </div>);
  }
}
