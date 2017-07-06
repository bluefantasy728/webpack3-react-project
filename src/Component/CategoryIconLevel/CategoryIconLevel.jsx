import React from 'react';
import PropTypes from 'prop-types';
import style from './CategoryIconLevel.css';
import PUBLIC from '../../../libs/public.js';

const propTypes = {
    CategorIcon : {iconData : PropTypes.object.isRequired},
    CategorIconLevel : {categoryData : PropTypes.array.isRequired}
};
const defaultProps = {
    iconData : {},
    categoryData : []
};

const CategorIcon = ({ iconData })=>{
    return (
        <a href="" className={style.iconItem}>
            
            <img src={`${PUBLIC.COMMON.picUrl}${iconData.pic}`} />
            <span>{iconData.name}</span>
        </a>
    );
};

const CategorIconLevel = ({ categoryData })=>{
    const categoryIcons = categoryData.map((item,i)=>{
        return <CategorIcon key={i} iconData={item}/>;
    });
    return (
        <div className={style.levelWrap}>
            {categoryIcons}
        </div>
    );
};
CategorIcon.propTypes = {iconData : PropTypes.object.isRequired};
CategorIconLevel.propTypes = {categoryData : PropTypes.array.isRequired};
CategorIcon.defaultProps = {iconData : {}};
CategorIconLevel.defaultProps = {categoryData : []};

export default CategorIconLevel;
