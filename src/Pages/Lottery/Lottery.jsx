import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import TopNavBar from '../../Component/TopNavBar/TopNavBar.jsx';
import BottomNavBar from '../../Component/BottomNavBar/BottomNavBar.jsx';

import PUBLIC from '../../../libs/public.js';

import style from './Lottery.css';

class Turntable extends React.Component{
    constructor(prop){
        super(prop);
        this.state={
            pointerDegStyle : {transform:'rotate(0deg)'}
        };
        this.startTurn = this.startTurn.bind(this);
    }

    startTurn(){
        let rndDeg = PUBLIC.UTILS.randomNum(0,360)+1800;
        
        this.setState({
            pointerDegStyle : {transform:`rotate(${rndDeg}deg)`,transition: '3s transform'}
        });

        setTimeout(()=>{
            alert(1);
            this.setState({
                pointerDegStyle : {transition: 'none',transform:'rotate(0deg)'}
            });

        },3000);
    }

    render(){
        return (
            <div className={style.tableContainer}>
                <div className={style.tablePic}></div>
                <div className={style.pointer}
                    onClick={this.startTurn}
                    style={this.state.pointerDegStyle}
                ></div>
            </div>      
        );
    }
}

export default class Lottery extends React.Component{
    constructor(prop){
        super(prop);
    }

    render(){
        return (
            <div className={style.lotteryBg}>
                <TopNavBar />
                <Turntable />
                <BottomNavBar />
            </div>      
        );
    }
}