import React from 'react';
import HomeNavItem from '../HomeNavItem/HomeNavItem.jsx';
import style from './HomeNavWrap.css';

function HomeNavWrap({ data }){
    
    const dataArr = data.map(
        (item, i) =>(
            <HomeNavItem
                key={i}
                itemData={item}
            />
        )
    );
    
    return (
        <div className={style.listWrap}>
            {dataArr}
        </div>
    );
}

export default HomeNavWrap;
