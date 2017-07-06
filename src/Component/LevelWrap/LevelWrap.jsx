import React from 'react';
import PropTypes from 'prop-types';
import LevelHeader from '../LevelHeader/LevelHeader.jsx';
import GoodsListWrap from '../GoodsListWrap/GoodsListWrap.jsx';
import style from './LevelWrap.css';

const propTypes = {
    data : PropTypes.array.isRequired,
    ifUrl : PropTypes.string.isRequired,
    title : PropTypes.string.isRequired
};

const defaultProps = {
    data : [],
    ifUrl : 'true',
    title : ''
};

function LevelWrap({ data, ifUrl, title, match }){
    return (
        <div className={style.wrap}>
            <LevelHeader title={title} ifUrl={ifUrl} match={match}/>
            <GoodsListWrap goodsArr={data} />
        </div>
        
    );
}

LevelWrap.propTypes = propTypes;
LevelWrap.defaultProps = defaultProps;

export default LevelWrap;