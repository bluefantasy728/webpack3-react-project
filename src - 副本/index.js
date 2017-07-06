import React from 'react';
import ReactDOM from 'react-dom';
require('./style/index.scss');
// import './style/index.scss'
const app = document.createElement('div');
app.id = 'box';

const img = document.createElement('img');
img.src = require('./img/2.jpg');
app.appendChild(img);

document.body.appendChild(app);