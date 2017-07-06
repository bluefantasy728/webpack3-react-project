import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import style from './GoodsListItem.css';
import PUBLIC from '../../../libs/public.js';
const UTILS = PUBLIC.UTILS;
const COMMON = PUBLIC.COMMON;

const propTypes = {
    item : PropTypes.object.isRequired
};

const defaultProps = {
    item : {}
};

function GoodsListItem({ item }){
    const imgUrl = UTILS.thumbnail(COMMON.picUrl + JSON.parse(item.pics)[0]); //图片地址
    let priceArea = UTILS.priceArea(item,style); //调用函数，进行判断，来得出显示价格的区域

    return (
        <Link to={`/detail:${item.skuId}`} className={style.goodsItem}>
            <img src={imgUrl} alt="" />
            <p className={style.goodsName}>{item.name}</p>
            {priceArea}
            <p className={style.origPrice}>{`￥${UTILS.fenToYuan(item.originalPrice)}`}</p>
            <p className="goods-seckill">
                {/*<span>12</span>月<span>10</span>日<span>13</span>:<span>00</span>*/}
            </p>
        </Link>
    );
}

GoodsListItem.propTypes = propTypes;
GoodsListItem.defaultProps = defaultProps;

export default GoodsListItem;