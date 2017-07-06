import React from 'react';
import style from './BottomNavBar.css';
import { Link } from 'react-router-dom';
export default function BottomNavBar({ match }){
	match = match ? match : '';
	let styleMall = match.path === '/' ?  style.mall_b : style.mall;
	let styleCate = match.path === '/category' ?  style.category_b : style.category;
	let styleCart = match.path === '/cart' ?  style.cart_b : style.cart;
	let styleOrder = match.path === '/order' ?  style.order_b : style.order;
    return (
        <footer className={style.footer}>
        	<div className={style.iconWrap}>
				<Link to="/" >
					<div className={styleMall}></div>
					<p>商城</p>
				</Link>
        	</div>
        	<div className={style.iconWrap}>
				<Link to="/category" >
					<div className={styleCate}></div>
					<p>分类</p>
				</Link>
        	</div>
        	<div className={style.iconWrap}>
				<Link to="/cart" >
					<div className={styleCart}></div>
					<p>购物车</p>
				</Link>
        	</div>
        	<div className={style.iconWrap}>
				<Link to="/order" >
					<div className={styleOrder}></div>
					<p>订单</p>
				</Link>
        	</div>
        </footer>
    );
}