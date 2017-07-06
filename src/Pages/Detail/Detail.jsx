import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TopNavBar from '../../Component/TopNavBar/TopNavBar.jsx';
import Banner from '../../Component/Banner/Banner.jsx';
import LevelWrap from '../../Component/LevelWrap/LevelWrap.jsx';

import style from './Detail.css';
import PUBLIC from '../../../libs/public.js';
const UTILS = PUBLIC.UTILS;
const COMMON = PUBLIC.COMMON;

//查看商品详情组件
const CheckDetail = ({title, target})=>{
    return (
        <div className={style.levelTab}>
            <span>{title}</span>
            <i></i>
        </div>
    );
};
CheckDetail.PropTypes = {
    title : PropTypes.string.isRequired,
    target : PropTypes.string
}
CheckDetail.defaultProps = {
    title : '',
    target : ''
}

//选择数量组件
class ChangeQty extends React.Component{
    constructor(prop){
        super(prop);
        this.state = {qty:'0'};
        this.addQty = this.addQty.bind(this);
        this.minusQty = this.minusQty.bind(this);
        this.changeQty = this.changeQty.bind(this);
    }

    addQty(){
        let qty = Number(this.state.qty);
        qty = qty + 1 + '';
        this.setState({qty,});
    }

    minusQty(){
        let qty = Number(this.state.qty);
        if(qty===0) return;
        qty = qty - 1 + '';
        this.setState({qty,});
    }

    changeQty(ev){
        let qty = ev.target.value + '';
        this.setState({qty,});
    }

    render(){
        return (
            <div className={style.levelTab}>
                <span>{this.props.title}</span>
                <div className={style.qty}>
                    <button onClick={this.minusQty}>-</button>
                    <input type="text" value={this.state.qty} onChange={this.changeQty}/>
                    <button onClick={this.addQty}>+</button>
                </div>
            </div>
        );
    }
};
ChangeQty.PropTypes = {
    title : PropTypes.string.isRequired
}
ChangeQty.defaultProps = {
    title : ''
}

class MerchantArea extends React.Component{
    constructor(prop){
        super(prop);
        this.state = {
            showInfo : false
        }
        this.merchantIcon = this.merchantIcon.bind(this);
    }
    merchantIcon(){
        let showInfo = this.state.showInfo;
        showInfo = ! showInfo;
        this.setState({showInfo,});
    }
    render(){
        const merchant = this.props.merchant;
        const merchantNode = !this.state.showInfo ? <em className={style.checkMerchant} onClick={this.merchantIcon}>点击查看商家信息</em> :
                <div>
                    <h5>{merchant.name}</h5>
                    <p>客服电话：{merchant.phone}</p>
                    <p>服务时间：{merchant.beginTime}-{merchant.endTime}</p>
                </div>
        return (
            <div className={style.merchantArea}>
                {merchantNode}
                <i onClick={this.merchantIcon}></i>
            </div>
        );
    }
}

//商品信息显示区域
const GoodsInfoArea = ({ goodsInfo })=>{
    
    const region = goodsInfo.regionName 
                ? <span>配送范围 : {goodsInfo.regionName}</span>
                : null;
    const isRefundable = goodsInfo.isRefundable === 0 
                        ? <span>不支持退货</span>
                        : <span>支持退货</span>
    return (
        <div className={style.infoWrap}>
            <h3 className={style.goodsName}>{goodsInfo.name}</h3>
            {goodsInfo.priceArea}
            <div className={style.otherInfo}>
                <span >{`月销量 ${goodsInfo.monthSalesQuantity} 件`}</span>
                <span >{`库存 ${goodsInfo.stock} 件`}</span>
            </div>
            <div className={style.regionRefundable}>
                {region}
                {isRefundable}
                <MerchantArea merchant={goodsInfo.merchant}/>
            </div>
        </div>
    );
};

GoodsInfoArea.propTypes = {
    goodsInfo : PropTypes.shape({
        name : PropTypes.string,
        priceArea : PropTypes.node,
        monthSalesQuantity : PropTypes.number,
        stock : PropTypes.number,
        merchant : PropTypes.shape({
            beginTime : PropTypes.string,
            endTime: PropTypes.string,
            name : PropTypes.string
        }),
        isRefundable : PropTypes.number,
        regionName : PropTypes.string
    }
).isRequired};
GoodsInfoArea.defaultProps = {goodsInfo:{
    merchant : {
        beginTime : '',
        endTime : '',
        name : ''
    }
}};

//Detail页面
class Detail extends React.Component{
    constructor(prop){
        super(prop);
        this.state = {
            goodsData : {},
            bannerData : [],
            yourMaybeLikeGoods: [],
            fetchData : {},
            skuId : this.props.match.params.skuId.substring(1)
        };
        
    }

    fetchGoodsInfo(){
        
        let url = PUBLIC.COMMON.serverUrl + '/api/goods/getGoods';
        let skuId = this.state.skuId;
        // console.log(skuId)

            fetch(url,{
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: `json={"skuId":${skuId}}`
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            let fetchData = data;
            //传给banner组件的arr属性
            const picArr = JSON.parse(fetchData.goodsSkus[0].pics);
            let bannerData = [];
            picArr.map((item, i)=>{
                bannerData.push({pic:item});
            });

            //传给商品信息区域goodsInfo属性
            let goodsInfo = {
                name : fetchData.goodsSkus[0].name,
                priceArea : UTILS.priceArea(fetchData.goodsSkus[0],style),
                monthSalesQuantity : fetchData.goodsSpu.monthSalesQuantity,
                stock : fetchData.goodsSkus[0].stock,
                merchant : fetchData.merchant,
                isRefundable : fetchData.goodsSpu.isRefundable,
                regionName : fetchData.goodsSpu.regionName
            };

            //猜你喜欢组件属性
            let yourMaybeLikeGoods = fetchData.yourMaybeLikeGoods;

            this.setState({
                goodsInfo,
                bannerData,
                yourMaybeLikeGoods,
                fetchData
            });
        })
        .catch(e => {
            console.log(`something wrong! ${e}`);
        });
    }
    componentWillReceiveProps(nextProps){
        const skuId = nextProps.match.params.skuId.substring(1);
        this.setState({
            skuId
        },()=>{
            this.fetchGoodsInfo();
        });
    }
    componentDidMount(){
        this.fetchGoodsInfo();
    }
    render(){
        return (
            <div className={style.wrap}>
                <TopNavBar />
                <div className={style.content}>
                    <Banner isSquare='true' bannerData={this.state.bannerData}/>
                    <GoodsInfoArea goodsInfo={this.state.goodsInfo} />
                    <ChangeQty title='选择数量' />
                    <CheckDetail title='查看商品详情' />
                    <LevelWrap 
                        data={this.state.yourMaybeLikeGoods} 
                        ifUrl="false" title="猜你喜欢"
                    />
                </div>
                <div className={style.toBuy}>去抢购</div>
                
            </div>
        );
    }
}

export default Detail;