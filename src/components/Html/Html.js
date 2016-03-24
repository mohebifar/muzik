import React, { Component, PropTypes } from 'react';

export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.shape({
      scripts: PropTypes.array,
      styles: PropTypes.array
    })
  };

  render() {
    const { children, assets: { styles, scripts } } = this.props;

    return (<html>
    <head>
      <title>Muzik</title>
      { styles.map(style => <link rel="stylesheet" href={style}/>) }
    </head>
    <body>
    <div id="content">
      { children }
    </div>
    { scripts.map(script => <script src={script}/>) }
    </body>
    </html>);
  }
}