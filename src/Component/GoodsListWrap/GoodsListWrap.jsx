import React from 'react';
import PropTypes from 'prop-types';
import GoodsListItem from '../GoodsListItem/GoodsListItem.jsx';
import style from './GoodsListWrap.css';

const propTypes = {
    goodsArr : PropTypes.array.isRequired
};

const defaultProps = {
    goodsArr : []
};

function GoodsListWrap({ goodsArr }){

    
    const goodsContent = goodsArr.map(
        
            (item, i) => {
                if(i<3){
                    return (<GoodsListItem key={i} item={item} />);
                }
            }
    );

    return (
        <div className={style.goodsListWrap}>
            {goodsContent}
        </div>
    );
}

GoodsListWrap.propTypes = propTypes;
GoodsListWrap.defaultProps = defaultProps;

export default GoodsListWrap;