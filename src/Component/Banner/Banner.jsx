import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import style from './Banner.css';

import PUBLIC from '../../../libs/public.js';
const COMMON = PUBLIC.COMMON;
const propTypes = {
    bannerData : PropTypes.array.isRequired,
    isSquare : PropTypes.string
};
const defaultProps = {
    bannerData : [],
    isSquare : 'false'
};

class Banner extends React.Component{
    constructor(prop){
        super(prop);
        let urlStyle = {
            transform : 'translate3d(0,0,0)',
            transition : 'none',
            width : 0,
            opacity : 0
        };
        this.state = {
            iCur : 0,
            style : urlStyle,
            height : '9.5rem'
            
        };
        this.bannerTimer = null;
        this.bannerMove = this.bannerMove.bind(this);
        this.height = this.props.isSquare === 'false' ? '9.5rem' : '100VW';
    }

    componentDidMount(){
        let urlStyle = this.state.style;
        let timer = setInterval(()=>{
            let bannerData = this.props.bannerData;
            if(bannerData.length !== 0){
                clearInterval(timer);
                this.setState({
                    style : {...urlStyle,
                        width:bannerData.length*100 + 'VW', //根据传入data的长度设置ul的宽度
                        opacity : '1',
                    }
                });
                this.bannerInterval();
            }
        },50);
    }

    componentWillUnmount(){
        clearInterval(this.bannerTimer);
    }

    bannerInterval(){ //让banner图开始自动播放
        this.bannerTimer = setInterval(()=>{
            let iCur = this.state.iCur;
            let w = document.documentElement.offsetWidth;
            iCur = iCur === this.props.bannerData.length-1 ? 0 : iCur+1;
            this.setState({
                iCur,
                style : {...this.state.style, 
                    transition : '0.5s all',
                    transform :`translate3d(-${iCur*w}px,0,0)`,
                }
            });
        },1000);
    }

    bannerMove(ev){
        clearInterval(this.bannerTimer);
        let urlStyle = this.state.style;
        let startX = ev.touches[0].pageX; //点击时的pageX
        let endX = 0;
        let diffX = 0;
        let w = document.documentElement.offsetWidth;
        let iCur = this.state.iCur;
        let num = this.props.bannerData.length;
        
        let moveFn = (ev)=>{
            let moveX = ev.touches[0].pageX;
            let diffX = moveX - startX;
            this.setState({
                style : {...urlStyle,
                    transform : `translate3d(${-iCur*w+diffX}px,0,0)`,
                    transition : 'none'
                }
            });
        };
        let offFn = (ev)=>{
            this.setState({
                style : {...this.state.style,
                    transition : '0.5s all'
                }
            });
            endX = ev.changedTouches[0].pageX;
            diffX = startX - endX; //向左+，向右-
            if(diffX > 0 && diffX > w/3){
                iCur = iCur === num-1 ? 0 : iCur+1;
            }else if(diffX < 0 && diffX < -w/3){
                iCur = iCur === 0 ? num-1 : iCur-1;
            }

            this.setState({
                iCur,
                style : {...this.state.style, 
                    transform :`translate3d(-${iCur*w}px,0,0)`,
                }
            });
            
            document.removeEventListener('touchmove',moveFn);
            document.removeEventListener('touchend',offFn);

            this.bannerInterval();
            
        }
        document.addEventListener('touchmove',moveFn, false);
        document.addEventListener('touchend',offFn, false);

    }

    render(){
        const bannerData = this.props.bannerData;
        const bannerItem = bannerData.map((item, i) => {
            return (
                <li key={i}>
                    <a><img src={`${COMMON.picUrl}${item.pic}`} /></a>
                </li>
            );
        });

        const shuttles = bannerData.map((item, i) => {
            let shuttleClass = classNames({
                [style.shuttleItem] : true,
                [style.shuttleActived] : this.state.iCur === i
            });
            return (<span key={i} className={shuttleClass}></span>);
        });

        return (
            <div className={style.wrap} style={{height:`${this.height}`}}>
                <ul className={style.scoller}
                    style={this.state.style}
                    onTouchStart={this.bannerMove}
                >
                    {bannerItem}
                </ul>
                <div className={style.shuttleNav}>
                    {shuttles}
                </div>
            </div>
        );

    }
}

Banner.propTypes = propTypes;
Banner.defaultProps = defaultProps;

export default Banner;