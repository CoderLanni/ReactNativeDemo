
import React, { Component, PropTypes } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    InteractionManager,
    DeviceEventEmitter
} from 'react-native';

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

class XZHWineCell extends Component{
    // 构造
      constructor(props) {
        super(props);

        // 初始状态
        this.state = {
            wine: this.props.wine
        };
      }

    render(){
        var wine = this.state.wine;
        return(
           <TouchableOpacity style={styles.viewStyle}>
               {/*左边*/}
               <TouchableOpacity style={styles.leftView}>
                    <Image source={{uri: wine.image}} style={styles.leftImageStyle}/>
                    <View style={{width:width * 0.7}}>
                        <Text
                            style={styles.titleStyle}
                            numberOfLines={1}
                        >
                            {wine.name}
                        </Text>
                        <Text>¥{wine.money}</Text>
                    </View>
               </TouchableOpacity>
               {/*右边*/}
               <View style={styles.rightView}>
                   <TouchableOpacity onPress={()=>this._removeWine(wine)}>
                       <Text style={[{fontSize:20}, styles.circleStyle]}>-</Text>
                   </TouchableOpacity>
                   <Text style={{fontSize:20, margin: 10}}>{wine.buyNum}</Text>
                   <TouchableOpacity  onPress={()=>this._addWine(wine)}>
                       <Text style={[{fontSize:20}, styles.circleStyle]}>+</Text>
                   </TouchableOpacity>
               </View>
           </TouchableOpacity>
        )
    }


    componentWillUpdate(nextProps) {
         // 接收通知
         this.notice = DeviceEventEmitter.addListener('refreshList', ()=>{
             // 1. 购买数量清零
             const tempWine = this.state.wine;
             tempWine.buyNum = 0;

             this.setState({
                 wine: tempWine
             })
         });
    }


    componentDidUnMount() {
        // 移除通知
        this.notice.remove();
    }

    /**
     * 移除商品
     */
    _removeWine(wine){
        // 1.判断
        if(wine.buyNum == 0){
            alert('商品数量不能小于0');
            return;
        }

        // 2. 改变数量
        wine.buyNum --;
        this.setState({
            wine: wine
        });
        
        // 3. 发出通知
        this._changeTotalPrice(wine);
    }
    
    /**
     * 添加商品
     */
    _addWine(wine){
        // 1. 改变数量
        wine.buyNum ++;
        this.setState({
            wine: wine
        });

        // 2. 发出通知
        this._changeTotalPrice(wine);
    }


    /**
     * 发出通知
     * @param wine 购买的商品
     * @private
     */
    _changeTotalPrice(wine){
        DeviceEventEmitter.emit('changeTotalPrice', wine);
    }

}

const styles = StyleSheet.create({
    viewStyle:{
        flexDirection:'row',
        backgroundColor:'#fff',
        borderBottomWidth:1,
        borderBottomColor: '#ccc'
    },

    leftView:{
        width: width * 0.7,
        flexDirection:'row',
        overflow:'hidden',
        alignItems:'center'
    },
   
    leftImageStyle: {
        width: 60,
        height: 60,
        margin: 5
    },

    rightView: {
        width: width * 0.3,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center'
    },

    titleStyle:{
        width: 0.5 * width
    },

    circleStyle:{
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth:1,
        borderColor:'red',
        textAlign:'center',
        alignItems:'center',
        color:'blue',
        fontWeight:'900'
    }
});


module.exports = XZHWineCell;