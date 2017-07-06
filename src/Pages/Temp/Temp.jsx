import React from 'react';
import PropTypes from 'prop-types';
import PUBLIC from '../../../libs/public.js';
const UTILS = PUBLIC.UTILS;
const COMMON = PUBLIC.COMMON;
class Hello extends React.Component{
    constructor(prop){
        super(prop);
    }
    render(){
        return (
            <div>
                {
                   this.props.data.name
                }
            </div>
        );
    }
}

class Temp extends React.Component{
    constructor(prop){
        super(prop);
    }
    componentDidMount(){
        let url = PUBLIC.COMMON.serverUrl + '/api/goods/getGoods';
		fetch(url,{
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: 'json={"skuId":"1838"}'
        })
		.then(response => {
          	return response.json();
        })
        .then(data => {
            this.setState({
                data : data.goodsSkus[0]
            });
        })
        .catch(e => {
            console.log(`something wrong! ${e}`);
        });
    }
    render(){
        return (
            <div>
                {
                   
                    <Hello data={this.state.data} />
                }
                
            </div>
        );
    }
}

export default Temp;

{/*<div id="table-body" className="account-table-row account-table-row-body">
    { data && data.map(accountInfo =>
        <AccountSimple {...accountInfo} />
    )}
</div>*/}