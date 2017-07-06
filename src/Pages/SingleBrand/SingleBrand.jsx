import React from 'react';
import { Link } from 'react-router-dom';
import GoodsListItem from '../../Component/GoodsListItem/GoodsListItem.jsx';
import style from './SingleBrand.css';
import PUBLIC from '../../../libs/public.js';
const UTILS = PUBLIC.UTILS;
const COMMON = PUBLIC.COMMON;

class SingleBrand extends React.Component{
    constructor(prop){
        super(prop);
        this.state = {
            goods : []
        };
    }

    componentDidMount(){
        console.log(this.props.match);
        const match = this.props.match.path.substring(1); //eg. birthday...
        let fetchUrl = '';
        let infoSource = '';
        var brandId = 0;
        var categoryId = '';
        var grade = '';
        
        switch(match){
            case 'birthday':
                fetchUrl = 'birthday/getBirthdayGoods';
                infoSource = 'goodSkus';
                break;
            case 'seckill':
                fetchUrl = 'seckill/getSeckillGoods';
                infoSource = 'goodSkus';
                break;
            case 'hotrecommend':
                fetchUrl = 'home/getHotGoods';
                infoSource = 'hotGoods';
                break;
            case 'hotsell':
                fetchUrl = 'home/getHotSellGoods';
                infoSource = 'hotSellGoods';
                break;
            case 'goodpraise':
                fetchUrl = 'home/getPraiseGoods';
                infoSource = 'praiseGoods';
                break;
            case 'singlebrand:id':
                fetchUrl = 'goods/searchGoods';
                infoSource = 'goodsSkus';
                grade = 0;
                categoryId = "0";
                brandId = this.props.match.params.id.substring(1);
                break;
            case 'threeLevel:id':
                fetchUrl = 'goods/searchGoods';
                infoSource = 'goodsSkus';
                grade = 3;
                categoryId = this.props.match.params.id.substring(1);
                brandId = 0;
                break;
        }

        console.log(match);
        console.log(brandId);

        const url = PUBLIC.COMMON.serverUrl + `/api/${fetchUrl}`;
        const params = {
            "currentPage":1,
            "pageSize":30,
            "goodsType":null,
            "searchKeywords":"",
            "grade": grade,
            "categoryId":categoryId,
            "brandId":brandId,
            "minPointPrice":-1,
            "maxPointPrice":-1,
            "minPrice":-1,
            "maxPrice":-1,
            "sortType":4,
            "isPromotion":0
        }

		fetch(url,{
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: `json=${JSON.stringify(params)}`
        })
		.then(response => {
          	return response.json();
        })
        .then(data => {
            let json = data;
            console.log(json)
            this.setState({
                goods :json[infoSource],
            });
        })
        .catch(e => {
            console.log(`something wrong! ${e}`);
        });
    }

    render(){
        const goods = this.state.goods;
        const goodsDoms = goods.map((item, i)=>{
            return (
                <GoodsListItem key={i} item={item} />
            );
        });

        return (
            <div className={style.brandGoods}>
                {goodsDoms}
            </div>
        );
    }
}

export default SingleBrand;