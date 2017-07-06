import React from 'react';
import { Link } from 'react-router-dom';
import style from './HomeBlock.css';

export default function HomeBlock(){
    return (
        <div className={style.wrap}>
            <div className={style.topLayer}>
                <Link to="/lottery">
                </Link>
                <div className={style.vertical}></div>
                <Link to="/birthday">
                </Link>
            </div>
            <div className={style.horizontal}></div>
            <div className={style.bottomLayer}>
                <Link to="/tuango">
                </Link>
                <div className={style.vertical}></div>
                <Link to="/discount">
                </Link>
             </div>
         </div>   
    );
}