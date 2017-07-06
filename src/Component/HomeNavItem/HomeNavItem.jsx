import React from 'react';
import { Link } from 'react-router-dom';
import style from './HomeNavItem.css';

//         imgName : 'nav_pic1',
//         name : '缤纷商品',
//         url : 'colorfull_goods.html'

function HomeNavItem({ itemData }){
    return (
        
            <Link to={`/${itemData.url}`} className={style.itemWrap}>
                <img className={style.itemImg} src={require(`../../img/${itemData.imgName}.png`)} />
                <span className={style.itemTitle}>{itemData.name}</span>
            </Link>
        
    );
}

export default HomeNavItem;
