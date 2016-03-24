import React, { Component, PropTypes } from 'react';
import IconButton from 'material-ui/lib/icon-button';
import PlayIcon from 'material-ui/lib/svg-icons/av/play-arrow';
import SkipNextIcon from 'material-ui/lib/svg-icons/av/skip-next';
import SkipPrevIcon from 'material-ui/lib/svg-icons/av/skip-previous';
import PauseIcon from 'material-ui/lib/svg-icons/av/pause';
import CardActions from 'material-ui/lib/card/card-actions';
import CardMedia from 'material-ui/lib/card/card-media';
import Slider from 'material-ui/lib/slider';
import Card from 'material-ui/lib/card/card';
import styles from './Player.scss';
import { connect } from 'react-redux';
import { togglePlayingState, setProgress } from 'redux/modules/player';

@connect(
  state => ({
    audio: state.player.audio,
    playingState: state.player.playingState,
    currentTime: state.player.currentTime
  }),
  {togglePlayingState, setProgress}
)
export default class Player extends Component {
  static propTypes = {
    currentTime: PropTypes.number.isRequired,
    playingState: PropTypes.bool.isRequired,
    togglePlayingState: PropTypes.func.isRequired
  };

  handleChangeSeek(event, progress) {
    this.props.setProgress(progress);
  }

  render() {
    const { playingState, currentTime, audio} = this.props;
    const progress = currentTime / audio.duration;

    return (<Card>
      <CardMedia>
        <img src="https://i.scdn.co/image/8675fae7dd68a7f8ee97d65106c2f68c8026498b"/>
      </CardMedia>
      <CardActions>
        <div className={styles.seekBarContainer}>
          <Slider onChange={this.handleChangeSeek.bind(this)} value={progress}/>
        </div>
        <div className={styles.controlsContainer}>
          <IconButton>
            <SkipPrevIcon/>
          </IconButton>
          <IconButton onClick={this.props.togglePlayingState}>
            {
              playingState ?
                <PauseIcon/> :
                <PlayIcon/>
            }
          </IconButton>
          <IconButton>
            <SkipNextIcon/>
          </IconButton>
        </div>
      </CardActions>
    </Card>);
  }
}
