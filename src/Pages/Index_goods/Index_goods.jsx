import React from 'react';

import TopNavBar from '../../Component/TopNavBar/TopNavBar.jsx';
import BottomNavBar from '../../Component/BottomNavBar/BottomNavBar.jsx';
import SectionGap from '../../Component/SectionGap/SectionGap.jsx';
import LayerPic from '../../Component/LayerPic/LayerPic.jsx';
import Banner from '../../Component/Banner/Banner.jsx';
import CategoryIconLevel from '../../Component/CategoryIconLevel/CategoryIconLevel.jsx';

import style from './Index_goods.css';
import PUBLIC from '../../../libs/public.js';

export default class Index_goods extends React.Component{
    constructor(prop){
        super(prop);
        this.state = {
            fetchData : []
        };
    }

    componentWillMount(){
        var url = PUBLIC.COMMON.serverUrl + '/api/home/installmentHome';

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
            if(data.returnCode){
                this.setState({
                    fetchData :data
                });
            }
            
            console.log(data);
        })
        .catch(e => {
            console.log(`something wrong! ${e}`);
        });
    }

    render(){
        alert(JSON.stringify(this.state.fetchData));
        return (<CategoryIconLevel />);
    }
}

