import React from 'react';
import ReactDOM from 'react-dom/server';
import Html from 'components/Html/Html';
import express from 'express';
import { port } from 'config';

const app = express();

const assets = {
  styles: [
    'https://fonts.googleapis.com/css?family=Roboto:400,300,500'
  ],
  scripts: [
    process.env.NODE_ENV === 'development' ?
      'http://localhost:8080/main.js' :
      '/dist/main.js'
  ]
};

if (process.env.NODE_ENV === 'production') {
  assets.styles.push('/dist/main.css');
}

app.use(express.static(__dirname + '/../static'));

app.use((req, res) => {
  const element = <Html assets={assets}/>;
  res.send(ReactDOM.renderToString(element));
});

console.log(`App started listening on port ${port}`);

app.listen(port);