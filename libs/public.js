import React from 'react';

var COMMON = {};
var UTILS = {};

// COMMON.picUrl = "http://43.254.150.58/b2c-fileserver";   //图片服务器
// COMMON.serverUrl = "http://43.254.150.58/b2c-web-cib"; //接口服务器
COMMON.serverUrl = "https://ccapp.cib.com.cn/b2c-web-cib"; //接口服务器
COMMON.picUrl = "https://ccapp.cib.com.cn/b2c-fileserver";   //图片服务器

UTILS.setRemFont = function(){
    var html = document.getElementsByTagName('html')[0];
    var width = html.getBoundingClientRect().width;
    // html.style.fontSize = width/37.5 + 'px';
    html.style.fontSize = width/18.75 + 'px';
}

UTILS.thumbnail = function(imgUrl){
	if(imgUrl) {
		var index = imgUrl.lastIndexOf('.');
		var mainName = imgUrl.substring(0, index);
		var extName = imgUrl.substring(index + 1, imgUrl.length);
		return mainName + '_small.' + extName;
	}
}
UTILS.fenToYuan = function(fen) {
	if(fen == null || fen == '') {
		return '0.00';
	}
	return parseFloat(fen * 0.01).toFixed(2);
}
//随机数
UTILS.randomNum = function(a, b){
	return parseInt(Math.random()*(b+1-a)+a);
}
//用来判断当前商品是否参加某个活动
UTILS.whichActivity = function(item){
	var objectData = {};
    var activity = 0; //0:没有活动, 1:discount, 2:group, 3:seckill
    if(item.hasDiscount){
        objectData = item.discount;
        activity = 1;
    }else if(item.hasGroupon){
        objectData = item.groupon;
        activity = 2;
    }else if(item.hasSeckill){
        objectData = item.seckill;
        activity = 3;
    }

    //判断objectData是否为空json
    var count = 0;
    for(var key in objectData){
        count ++;
    }
    var returnJson = {}; //用于最后return出去的json，表明是否参加活动，以及数据源
    if(count !== 0){ //说明产品在参加某个活动，价格数据要从活动对象里去拿
        returnJson = {
            isActivity : true,
            itemData : objectData,
            activity
        };
    }else{
        returnJson = {
            isActivity : false,
            itemData : item,
            activity
        };
    }
    return returnJson;
};

//进行判断，来得出显示价格的区域
UTILS.priceArea = function(item,style){
	let priceArea = {}; //一个展示现在价格的虚拟DOM
    let itemData = UTILS.whichActivity(item);
    var objectData = itemData.itemData;
    if(itemData.isActivity){ //说明产品在参加某个活动，价格数据要从活动对象里去拿
        priceArea = objectData.payType === 1
            ? <p className={style.currentPrice}><em>￥</em>{UTILS.fenToYuan(objectData.price)}</p>
            : <p className={style.currentPrice}>{objectData.price}<em>积分</em></p>
    }else{ //从第一层数据获取价格
        priceArea = objectData.isMoneyPay === 1
            ? <p className={style.currentPrice}><em>￥</em>{UTILS.fenToYuan(objectData.price)}</p>
            : <p className={style.currentPrice}>{objectData.pointPrice}<em>积分</em></p>
    }
	return priceArea;
};

//判断数组arr中是否存在value
UTILS.ifInArray = function(value, arr){
    for(var i=0; i<arr.length; i++){
        if(arr[i] === value) return true;
    }
    return false;
};

//传入数字，如果小于10，补0，用于倒计时
UTILS.addZero = function(num){
    return num>9 ? ''+num : '0'+num;
}

export default {
    COMMON,
    UTILS
}

