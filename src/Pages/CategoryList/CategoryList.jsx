import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import TopNavBar from '../../Component/TopNavBar/TopNavBar.jsx';
import BottomNavBar from '../../Component/BottomNavBar/BottomNavBar.jsx';

import style from './CategoryList.css';
import PUBLIC from '../../../libs/public.js';
const UTILS = PUBLIC.UTILS;
const COMMON = PUBLIC.COMMON;

class LeftSide extends React.Component{
    constructor(prop){
        super(prop);
        this.state = {
            index : 0
        };
        this.selectCate = this.selectCate.bind(this);
    }
    selectCate(i){
        console.log(i);
        this.props.changeIndex(i);
        this.setState({
            index : i
        });
    }

    render(){
        let self = this;
        const categorys = this.props.categorys;
        const cateList = categorys.map((item, i)=>{
            let itemStyle = classnames({
                [style.cateItem] : true,
                [style.cateSelected] : this.state.index === i
            });
            return (<li key={item.id} 
                        className={itemStyle}
                        onClick={function(){
                            self.selectCate(i);
                        }}
                    >
                        {item.name}
                    </li>)
        });
        return (
            <div className={style.leftSide}>
                <ul>
                    {cateList}
                </ul>
            </div>
        );
    }
}
LeftSide.defaultProps = {categorys:[]};
LeftSide.propTypes = {categorys : PropTypes.array.isRequired};

const CateUnit = ({ cateData })=>{
    const cateIconArr = cateData.subList.map((item, i)=>(
        <Link to={`/threeLevel:${item.id}`} key={item.id} className={style.cateOne}>
            <img src={`${COMMON.picUrl}${item.pic}`} alt=""/>
            <p>{item.name}</p>
        </Link>
    ));
    
    return (
        <div className={style.cateUnit}>
            <h5>{cateData.name}</h5>
            <div className={style.cateWrap}>
                {cateIconArr}
            </div>
        </div>
    );
};
CateUnit.defaultProps = {cateData : {
    subList : []
}};
CateUnit.propTypes = {cateData : PropTypes.object.isRequired};

class RightSide extends React.Component{
    constructor(prop){
        super(prop);
    }

    render(){
        const cateArr = this.props.cateDisplay.subList.map((item, i)=>(
            <CateUnit key={item.id} cateData={item}/>
        ));
        
        return(
            <div className={style.rightSide}>
                {cateArr}
            </div>
        );
    }
}
RightSide.defaultProps = {cateDisplay : {
    subList : []
}};
RightSide.propTypes = {cateDisplay : PropTypes.object.isRequired};

class CategoryList extends React.Component{
    constructor(prop){
        super(prop);
        this.state = {
            fetchData  : [],
            displayData : {
                subList : []
            }
        };
        this.changeIndex = this.changeIndex.bind(this);
    }

    changeIndex(index){
        this.setState({
            displayData : this.state.fetchData[index]
        });
    }

    componentDidMount(){
        var url = PUBLIC.COMMON.serverUrl + '/api/goods/getGoodsCategory';

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
            if(json.returnCode === 1){
                this.setState({
                    fetchData :json.goodsCategorys,
                    displayData : json.goodsCategorys[0]
                });
                console.log(this.state.displayData);
            }
        })
        .catch(e => {
            console.log(`something wrong! ${e}`);
        });
    }

    render(){
        return (
            <div className={style.wrap}>
                <TopNavBar />
                <section className={style.content}>
                    <LeftSide categorys={this.state.fetchData} changeIndex={this.changeIndex} />
                    <RightSide cateDisplay={this.state.displayData}/>
                </section>
                <BottomNavBar match={this.props.match} />
            </div>
        );
    }
}

export default CategoryList;