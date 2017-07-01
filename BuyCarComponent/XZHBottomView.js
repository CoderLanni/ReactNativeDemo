
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    DeviceEventEmitter
} from 'react-native';

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

class XZHBottomView extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            // 购买商品总金额
            totalPrice: 0,
            // 购买的酒数组
            buyWineArr: []
        };
    }

    
    render(){
        return(
            <View style={styles.viewStyle}>
                <View style={styles.leftView}>
                    <Text style={{fontSize:18}}>总价:</Text>
                    <Text style={{fontSize:18, color:'red'}}>¥{this.state.totalPrice}</Text>
                </View>
                <View style={styles.rightView}>
                  <TouchableOpacity onPress={()=>this._buy()}>
                    <Text style={{fontSize:16, marginRight:5}}>购买</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>this._clearGoods()}>
                    <Text style={{fontSize:16, color:'red'}}>清空购物车</Text>
                  </TouchableOpacity>
                </View>
            </View>
        )
    }


    /**
     * 点击购买
     * @private
     */
    _buy() {
        var buyString = '您购买的商品清单: \n';
        this.state.buyWineArr.forEach((value, index)=>{
            buyString += '(' + (index+1) + ') 商品ID:' + value.id + ', 单价:' + value.money + ', 购买数量' + value.buyNum + '\n';
        });
        alert(buyString + '\n' + '总价:' + this.state.totalPrice + '元');
    }


    /**
     * 清空购物车
     * @private
     */
    _clearGoods() {
        // 1. 删除购物车中所有商品
        const buyWineArr = this.state.buyWineArr;
        buyWineArr.splice(0, buyWineArr.length);

        // 2. 更新状态,刷新UI
        this.setState({
            buyWineArr: buyWineArr,
            totalPrice: 0
        })
        
        // 3. 通知界面刷新
        DeviceEventEmitter.emit('refreshList', null);
    }


    componentDidMount() {
        this.notice = DeviceEventEmitter.addListener('changeTotalPrice', (wine)=>{
            // 1. 深拷贝一个新对象
            var tempWine = JSON.parse(JSON.stringify(wine));

            // 2. 判断
            var tempWineArr = this.state.buyWineArr;

            tempWineArr.forEach((value, index)=>{
                if(value.id == tempWine.id){
                    tempWineArr.splice(index, 1);
                }
            });

            if(tempWine.buyNum > 0){
                tempWineArr.push(tempWine);
            }

            // 3. 计算总价
            var totalPrice = 0;
            tempWineArr.forEach((value, index)=>{
                totalPrice += value.buyNum * value.money
            });

            // 4. 更新状态,刷新UI
            this.setState({
                totalPrice: totalPrice,
                buyWineArr: tempWineArr
            })
        });
    }

    componentWillUnMount() {
        this.notice.remove();
    }
}


const styles = StyleSheet.create({
    viewStyle:{

        flexDirection: 'row',
        height:44,
        borderTopWidth:1,
        borderTopColor:'#999',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#ccc',

        position:'absolute',
        bottom: 50,
        width: width
    },

    leftView:{
        flexDirection:'row',
        marginLeft: 8
    },

    rightView:{
        flexDirection:'row',
        marginRight: 8
    }
});


module.exports = XZHBottomView;