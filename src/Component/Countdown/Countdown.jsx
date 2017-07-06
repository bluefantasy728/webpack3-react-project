import React from 'react';
import PropTypes from 'prop-types';

import PUBLIC from '../../../libs/public.js';
const UTILS = PUBLIC.UTILS;
const COMMON = PUBLIC.COMMON;

import style from './countdown.css';

class Countdown extends React.Component{
    constructor(prop){
        super(prop);
        this.state = {
            days : '00',
            hour : '00',
            min : '00',
            sec : '00'
        };
        
        this.timer = setInterval(()=>{
            this.tick();
        }, 1000);
    }
    componentDidMount(){
        this.tick();
    }

    componentWillUnmount(){
        clearInterval(this.timer);
    }

    tick(){
        let nowTime = new Date().getTime(); //应该从服务器拿这个值
        let endTime = Number(this.props.endTime);
        let addZero = UTILS.addZero;
        let seconds = (endTime - nowTime)/1000; //还有多久(秒)
		let minutes = Math.floor(seconds/60);
		let hours = Math.floor(minutes/60);
		let days = addZero(Math.floor(hours/24));
		let hour= addZero(hours % 24);
		let min= addZero(minutes % 60);
		let sec= addZero(Math.floor(seconds%60));
        
        this.setState({
            days, hour, min, sec
        });
    }

    render(){
        let {days,hour,min,sec} = this.state;
        return (
            <div className={style.countdown}>
                <span>{days}</span>天
                <span>{hour}</span>:
                <span>{min}</span>:
                <span>{sec}</span>
            </div>
        );
    }
}
Countdown.defaultProps = {
    endTime : new Date().getTime()
};
Countdown.propTypes = {
    endTime : PropTypes.number.isRequired
};
export default Countdown;