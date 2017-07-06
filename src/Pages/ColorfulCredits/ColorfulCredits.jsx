import React from 'react';
import TopNavBar from '../../Component/TopNavBar/TopNavBar.jsx';
import BottomNavBar from '../../Component/BottomNavBar/BottomNavBar.jsx';
import LevelWrap from '../../Component/LevelWrap/LevelWrap.jsx';
import LayerPic from '../../Component/LayerPic/LayerPic.jsx';
import Banner from '../../Component/Banner/Banner.jsx';
import SectionGap from '../../Component/SectionGap/SectionGap.jsx';
import CategoryIconLevel from '../../Component/CategoryIconLevel/CategoryIconLevel.jsx';

import style from './ColorfulCredits.css';
import PUBLIC from '../../../libs/public.js';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const CategoryLevel = ({ category })=>{
    return (
        <div>
            <SectionGap /> {/*隔层*/}
            <LayerPic imgUrl={category.floorPic} ifStatic="false"/>
            <LevelWrap data={category.goodsSkus} title={category.name}/>
        </div>
        
    );
};
CategoryLevel.defaultProps = {
    category : {
        floorPic : '/goods/category/78e28cda-49f2-4e5f-83d0-5ced769d684e.jpg',
        id : 0,
        name : '',
        pic : '' 
    }
};

class ColorfulCredits extends React.Component{
    constructor(prop){
        super(prop);
        this.state = {
            fetchData : {},
            CategoryIcon : [],
            categorys : []
        };
    }

    componentDidMount(){
        //这里要根据url来判断应该加载哪个接口
        let param = this.props.match.params.type === ':goods' ? 'installmentHome' : 'pointHome';
        var url = PUBLIC.COMMON.serverUrl + `/api/home/${param}`;

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
            const json = data;
            //先把数据里的2个数组合并成一个，先要按照类别id排序,再从中找出8个产品数据最多的
            const categorysTempArr = (json.categorys);
            const goodsFloorsArr = (json.goodsFloors);
            console.log(goodsFloorsArr)
            //把所有数据都添加完全
            for(let i=0; i<categorysTempArr.length; i++){
                goodsFloorsArr[i].name = categorysTempArr[i].name;
                goodsFloorsArr[i].floorPic = categorysTempArr[i].floorPic;
                goodsFloorsArr[i].pic = categorysTempArr[i].pic;
            }
            const sortedArr = sortByLen(goodsFloorsArr);
            const categorys = sortedArr.filter((item)=>{
                return (item.goodsSkus.length !== 0);
            });
            this.setState({
                fetchData : json,
                CategoryIcon : goodsFloorsArr.slice(0,8),
                categorys,
            });
        })
        .catch(e => {
            console.log(`something wrong! ${e}`);
        });
    }

    render(){
        let categoryLevel = [];
        for(let i=0; i<this.state.categorys.length; i++){
            categoryLevel.push(<CategoryLevel key={i} category={this.state.categorys[i]}/>);
        }
        return (
            
            <div className={style.wrap}>
                <TopNavBar />
                <div className={style.content}>
                    <Banner bannerData={this.state.fetchData.banners}/>
                    <CategoryIconLevel categoryData={this.state.CategoryIcon}/>
                    {categoryLevel}
                </div>
                <BottomNavBar />
            </div>
            
        );
    }
}
ColorfulCredits.defaultProps = {};

//根据id大小排序
const sortById = (arr)=>{
    let sortedArr = arr.sort((a, b)=>{
        return (a.id - b.id);
    });
    return sortedArr;
};
//根据goodsSkus里的商品数量大小排序
const sortByLen = (arr)=>{
    let sortedArr = arr.sort((a, b)=>{
        return (b.goodsSkus.length - a.goodsSkus.length);
    });
    return sortedArr;
};

export default ColorfulCredits;