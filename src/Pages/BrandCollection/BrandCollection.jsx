import React from 'react';
import { Link } from 'react-router-dom';

import style from './BrandCollection.css';
import PUBLIC from '../../../libs/public.js';
const UTILS = PUBLIC.UTILS;
const COMMON = PUBLIC.COMMON;

class BrandCollection extends React.Component{
    constructor(prop){
        super(prop);
        this.state = {
            brands : []
        };
    }

    componentDidMount(){
        let url = PUBLIC.COMMON.serverUrl + `/api/goods/getGoodsBrands`;

		fetch(url,{
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: 'json={}'
        })
		.then(response => {
          	return response.json();
        })
        .then(data => {
            let json = data;
            console.log(json)
            this.setState({
                brands :json.goodsBrands,
            });
        })
        .catch(e => {
            console.log(`something wrong! ${e}`);
        });
    }

    render(){
        const brandsArr = this.state.brands.map((item, i)=>{
            let imgUrl = `${COMMON.picUrl}${item.pic}`;

            return (
                <Link to={`/singlebrand:${item.id}`} key={item.id} className={style.brandItem}>
                    <img src={imgUrl} alt=""/>
                </Link>
            );
            
        });

        return (
            <div className={style.wrap}>{brandsArr}</div>
        );
    }
}

export default BrandCollection;