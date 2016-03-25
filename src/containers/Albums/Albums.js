import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/lib/circular-progress';
import Album from 'components/Album/Album';
import { loadArtistAlbums, isLoaded } from 'redux/modules/playlist';
import styles from './Albums.scss';

@connect(
  state => ({
    albums: state.playlist.data,
    loading: state.playlist.loading,
    loaded: state.playlist.loaded
  }),
  {
    loadArtistAlbums
  }
)
export default class Albums extends Component {
  static propTypes = {
    loadArtistAlbums: PropTypes.func.isRequired,
    albums: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    loaded: PropTypes.bool.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillMount() {
    if (!isLoaded(this.context.store)) {
      // Load Michael Jackson Albums
      this.props.loadArtistAlbums('3fMbdgg4jU18AjLCKBhRSm');
    }
  }

  renderAlbums() {
    const { albums } = this.props;

    return (<div style={styles.albumsContainer}>
      {
        albums.map(album => <Album key={album.id} album={album}/>)
      }
    </div>);
  }

  render() {
    const { loading } = this.props;

    return (<div className={styles.container}>
      {
        loading ? <CircularProgress /> : this.renderAlbums()
      }
    </div>);
  }
}
