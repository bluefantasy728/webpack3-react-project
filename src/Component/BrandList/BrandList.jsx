import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LevelHeader from '../LevelHeader/LevelHeader.jsx';
import PUBLIC from '../../../libs/public.js';
import style from './BrandList.css';

const BrandItem = ({ item })=>{
    return (
        <Link to={`/singlebrand:${item.id}`} className={style.brandItem}>
            <img src={`${PUBLIC.COMMON.picUrl}${item.pic}`} alt=""/>
            <p>{item.name}</p>
        </Link>
    );
};
BrandItem.defaultProps = {item:''};

class BrandList extends React.Component{
    constructor(prop){
        super(prop);
    }
    render(){
        const brands = this.props.data.map((item, i)=>(
            <BrandItem key={i} item={item} />
        ));

        return (
            <div className={style.wrap}>
                <LevelHeader title={this.props.title} ifUrl={this.props.ifUrl} match={this.props.match} />
                <div className={style.brandList}>
                    {brands}
                </div>
            </div>
            
        );
    }
}
BrandList.defaultProps = {
    title : '',
    ifUrl : '',
    data : []
};
export default BrandList;