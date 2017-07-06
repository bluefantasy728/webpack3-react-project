import React from 'react';
import ReactDOM from 'react-dom';
import ShoppingMall from './Component/ShoppingMall/ShoppingMall.jsx';

//import styles
require('./style/normalize.css');
import appStyle from './style/app.css';

const app = document.createElement('div');
app.id = 'appContainer';
document.body.appendChild(app);
ReactDOM.render(<ShoppingMall />, app);

//设置适应各种屏幕大小的meta标签
const meta = document.createElement('meta');
meta.name = "viewport";
meta.content = "width=device-width, initial-scale=1.0";
const firstDOM = document.head.children[0];
document.head.insertBefore(meta, firstDOM);

//设置rem对应的根节点的字体大小
import PUBLIC from '../libs/public.js';
PUBLIC.UTILS.setRemFont();
