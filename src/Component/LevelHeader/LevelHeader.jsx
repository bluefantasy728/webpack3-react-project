import React from 'react';
import { Link } from 'react-router-dom';
import GoodsListWrap from '../GoodsListWrap/GoodsListWrap.jsx';

import style from './LevelHeader.css';

export default function LevelHeader({title, url, ifUrl, match}){
    return (
        <div className={style.header}>
            {title}
            {JSON.parse(ifUrl) ? <Link to={`/${match}`} className={style.more} >更多 ></Link> : null}
            <GoodsListWrap />
            
        </div>
    );
}