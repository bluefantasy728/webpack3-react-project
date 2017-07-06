import React from 'react';
import HomeNavWrap from '../../Component/HomeNavWrap/HomeNavWrap.jsx';
import TopNavBar from '../../Component/TopNavBar/TopNavBar.jsx';
import BottomNavBar from '../../Component/BottomNavBar/BottomNavBar.jsx';
import SectionGap from '../../Component/SectionGap/SectionGap.jsx';
import HomeBlock from '../../Component/HomeBlock/HomeBlock.jsx';
import LevelWrap from '../../Component/LevelWrap/LevelWrap.jsx';
import LayerPic from '../../Component/LayerPic/LayerPic.jsx';
import Banner from '../../Component/Banner/Banner.jsx';
import BrandList from '../../Component/BrandList/BrandList.jsx';

import style from './Index.css';
import PUBLIC from '../../../libs/public.js';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const homeNavData = [
    {
        imgName : 'nav_pic1',
        name : '缤纷商品',
        url : 'colorfulgoods:goods'
    },{
        imgName : 'nav_pic2',
        name : '积分好礼',
        url : 'colorfulgoods:credit'
    },{
        imgName : 'nav_pic3',
        name : '尊贵权益',
        url : 'equityzone'
    },{
        imgName : 'nav_pic4',
        name : '优惠券',
        url : 'couponcenter'
    }
];

const layerPicArr = [
    'ad_banner1.jpg',
    'ad_banner2.jpg'
];

export default class Index extends React.Component{
    
    constructor(prop){
        super(prop);
        this.state = {
            fetchData : {}
        };
    }

    componentWillMount(){
        var url = PUBLIC.COMMON.serverUrl + '/api/home/mallHome';

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
            this.setState({
                fetchData :data
            });
            console.log(data);
        })
        .catch(e => {
            console.log(`something wrong! ${e}`);
        });
    }

    render(){
        return (
            <div className={style.shoppingMallContainer}>
                <TopNavBar />
                <section className={style.content}>
                   
                    <Banner bannerData={this.state.fetchData.banners} /> {/*轮播图*/}
                   
                    <HomeNavWrap 
                        data={homeNavData}
                    />  {/*四横图标*/}
                    <SectionGap /> {/*隔层*/}
                   
                    <HomeBlock />  {/*四方格*/}
                   
                    <LevelWrap 
                        data={this.state.fetchData.seckillGoods} 
                        ifUrl="true" title="秒杀" match="seckill"
                    />
                    <LevelWrap 
                        data={this.state.fetchData.hotGoods} 
                        ifUrl="true" title="热门推荐" match="hotrecommend"
                    />
                    <LayerPic imgUrl={layerPicArr[0]} ifStatic="true"/>  {/*封层图*/}
                    <BrandList data={this.state.fetchData.brands} 
                        ifUrl="true" title="品牌专区" match="brandzone"
                    />
                    <LevelWrap 
                        data={this.state.fetchData.hotSellGoods} 
                        ifUrl="true" title="热销商品" match="hotsell"
                    />
                    <LevelWrap 
                        data={this.state.fetchData.praiseGoods} 
                        ifUrl="true" title="好评榜" match="goodpraise"
                    /> 
                    
                    <LevelWrap 
                        data={this.state.fetchData.yourMaybeLikeGoods} 
                        ifUrl="false" title="猜你喜欢"
                    />

                </section>
                <BottomNavBar match={this.props.match} />
            </div>
            
        );
    }
    
}

