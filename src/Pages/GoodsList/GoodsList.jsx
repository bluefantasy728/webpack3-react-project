import React from 'react';
import PropTypes from 'prop-types';

import Countdown from '../../Component/Countdown/Countdown.jsx';

import style from './GoodsList.css';
import PUBLIC from '../../../libs/public.js';
const UTILS = PUBLIC.UTILS;
const COMMON = PUBLIC.COMMON;

const GoodsItem = ( {item} )=>{
    const itemData = UTILS.whichActivity(item);
    const activityType = item.activity; //0:没有活动, 1:discount, 2:group, 3:seckill
    
    let buttonText = ''; //用作去购买按钮的DOM变量
    let comments = null; //用作不同活动显示的标语
    let buttonStyle = {};

    switch(itemData.activity){
        case 0||1:
            buttonText = '去购买';
            buttonStyle = {
                background : 'deepskyblue',
                left : '0',
                bottom : '0',
            };
            break;
        // case 1:
        //     buttonText = '去秒杀';
        //     buttonStyle = {
        //         background : 'green',
        //         right : '0',
        //         bottom : '2rem',
        //     };
        //     comments = <div style={{marginTop:'0.3rem'}}><em>离活动结束还剩：</em><Countdown endTime={itemData.itemData.grouponEndTime} /></div>
        //     break;
        case 2:
            buttonText = '去团购';
            buttonStyle = {
                background : 'orange',
                right : '0',
                bottom : '2rem',
            };
            comments = <div style={{marginTop:'0.3rem'}}><em>离活动结束还剩：</em><Countdown endTime={itemData.itemData.grouponEndTime} /></div>
            break;
        default:
            buttonText = '去购买';
            buttonStyle = {
                background : 'deepskyblue',
                left : '0',
                bottom : '0',
            };
            break;
    }
    
    const priceArea = UTILS.priceArea(item,style);
    const imgUrl = JSON.parse(item.pics)[0];
    return (
        <div className={style.goodsItem}>
            <img src={`${COMMON.picUrl}${imgUrl}`} className={style.img} />
            <div className={style.goodsInfo}  >
                <h5 className="twoLine">{item.name}</h5>
                {priceArea}
                <span className={style.originPrice}>￥{item.originalPrice}</span>
                {comments}
                <button style={buttonStyle}>{buttonText}</button>
            </div>
        </div>
    );
};

GoodsItem.defaultProps = {
    item : {}
};
GoodsItem.propTypes = {
    item : PropTypes.object.isRequired
};

class GoodsList extends React.Component{
    constructor(prop){
        super(prop);
        this.state = {
            fetchData :{
                goodSkus : []
            }
        };
    }
    componentDidMount(){
        let path = this.props.match.path;
        let fetchUrl = '';
        console.log(path)
        switch(path){
            case '/tuango':
                fetchUrl = 'groupon/getGrouponGoods';
                break;
            case '/discount':
                fetchUrl = 'discount/getDiscountGoods';
                break;
            case '/birthday':
                fetchUrl = 'birthday/getBirthdayGoods';
                break;
        }
        
        console.log(fetchUrl)

        let url = PUBLIC.COMMON.serverUrl + `/api/${fetchUrl}`;

		fetch(url,{
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: 'json={"currentPage":1,"pageSize":10}'
        })
		.then(response => {
          	return response.json();
        })
        .then(data => {
            const json = data;
            console.log(json);
            this.setState({
                fetchData :data,
                goodSkus : json.goodSkus
            });
            
        })
        .catch(e => {
            console.log(`something wrong! ${e}`);
        });
    }

    render(){
        const goodSkus = this.state.fetchData.goodSkus;
        const goodsArr = goodSkus.map((item, i)=>(
            <GoodsItem item={item} key={i} />
        ));
        
        return (
            <div>
                {goodsArr}
            </div>
        );
    }
}

export default GoodsList;