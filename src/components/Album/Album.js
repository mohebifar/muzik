import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import styles from './Album.scss';

export default class Album extends Component {
  static propTypes = {
    album: PropTypes.object.isRequired
  };

  render() {
    const { album } = this.props;

    return (<div className={styles.container}>
      <Link to={`/now-playing/${album.id}`}>
        <Card>
          <CardMedia
            overlay={<CardTitle title={album.name}/>}>
            <img src={album.images[1].url}/>
          </CardMedia>
        </Card>
      </Link>
    </div>);
  }
}
