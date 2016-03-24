import React from 'react';
import ReactDOM from 'react-dom/server';
import Html from 'components/Html/Html';
import express from 'express';
import { port } from 'config';

const app = express();

app.use((req, res) => {
  const assets = {
    styles: [
      'https://fonts.googleapis.com/css?family=Roboto:400,300,500'
    ],
    scripts: [
      'http://localhost:8080/main.js'
    ]
  };

  const element = <Html assets={assets}/>;
  res.send(ReactDOM.renderToString(element));
});

console.log(`App started listening on port ${port}`);

app.listen(port);