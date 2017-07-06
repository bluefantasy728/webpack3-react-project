import React from 'react';
import PropTypes from 'prop-types';
import PUBLIC from '../../../libs/public.js';

const propTypes = {
    imgUrl : PropTypes.string.isRequired
};

const defaultProps = {
    imgUrl : ''
};

function LayerPic( {imgUrl, ifStatic} ){
    let imgNode = JSON.parse(ifStatic) 
            ? <img src={require(`../../img/${imgUrl}`)} style={{height:'100%',width:'100VW'}} />
            : <img src={`${PUBLIC.COMMON.picUrl}${imgUrl}`} style={{height:'100%',width:'100VW'}} />
    return (
        <div style={{height:'5.1rem'}}>
            {imgNode}
        </div>
    );
}

LayerPic.propTypes = propTypes;
LayerPic.defaultProps = defaultProps;

export default LayerPic;