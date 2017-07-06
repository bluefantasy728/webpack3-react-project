import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Index from '../../Pages/Index/Index.jsx';
import Lottery from '../../Pages/Lottery/Lottery.jsx';
import Detail from '../../Pages/Detail/Detail.jsx';
import ColorfulCredits from '../../Pages/ColorfulCredits/ColorfulCredits.jsx';
import GoodsList from '../../Pages/GoodsList/GoodsList.jsx';
import CategoryList from '../../Pages/CategoryList/CategoryList.jsx';
import BrandCollection from '../../Pages/BrandCollection/BrandCollection.jsx';
import SingleBrand from '../../Pages/SingleBrand/SingleBrand.jsx';

import Temp from '../../Pages/Temp/Temp.jsx';

import style from './ShoppingMall.css';

export default class ShoppingMall extends React.Component{
    
    constructor(prop){
        super(prop);
    }

    

    render(){
        return (
            <Router>
                <div style={styles.content}>

                    {/*<ReactCSSTransitionGroup
                        transitionName="fade"
                        transitionEnterTimeout={300}
                        transitionLeaveTimeout={300}
                    >*/}

                    <Route exact path="/" component={Index} />
                    <Route path="/index" component={Index} />
                    <Route path="/colorfulgoods:type" component={ColorfulCredits} />
                    <Route path="/category" component={CategoryList} />
                    <Route path="/lottery" component={Lottery} />
                    <Route path="/birthday" component={SingleBrand} />
                    <Route path="/seckill" component={SingleBrand} />
                    <Route path="/hotrecommend" component={SingleBrand} />
                    <Route path="/hotsell" component={SingleBrand} />
                    <Route path="/goodpraise" component={SingleBrand} />
                    <Route path="/singlebrand:id" component={SingleBrand} />
                    <Route path="/threeLevel:id" component={SingleBrand} />
                    <Route path="/brandzone" component={BrandCollection} />
                    <Route path="/tuango" component={GoodsList} />
                    <Route path="/discount" component={GoodsList} />
                    <Route path="/detail:skuId" component={Detail} />
                    
                    {/*</ReactCSSTransitionGroup>*/}

                </div>
            </Router>
        );
    }
    
}

const styles = {}

styles.fill = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
}

styles.content = {
  ...styles.fill,
  top: '40px',
  textAlign: 'center',
  height:'100%'
}

styles.nav = {
  padding: 0,
  margin: 0,
  position: 'absolute',
  top: 0,
  height: '40px',
  width: '100%',
  display: 'flex'
}

styles.navItem = {
  textAlign: 'center',
  flex: 1,
  listStyleType: 'none',
  padding: '10px'
}

styles.hsl  = {
  ...styles.fill,
  color: 'white',
  paddingTop: '20px',
  fontSize: '30px'
}

