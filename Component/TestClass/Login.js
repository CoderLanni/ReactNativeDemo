



/**
 * Created by wlei on 16/8/4.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    AlertIOS,
    AsyncStorage
} from 'react-native';

import Toast,{DURATION} from 'react-native-easy-toast';  //引入Toast控件
//AsyncStorage是以键值对的形式保存数据 ，诸如安卓中SharedPreferences一样
const AS_KEY = "as_key";

var Dimensions = require('Dimensions');
//获取屏幕宽度
var screenWidth = Dimensions.get('window').width;

var LoginByPhoneViewController = require('./LoginByPhoneViewController');

var TouTiaoLoginView  = React.createClass({
    //查询保存的数据
    asQuery() {
        AsyncStorage.getItem(AS_KEY, (error, result) => {
            if (!error) {
                if (result !== '' && result !== null) {
                    this.toast.show('查询到的内容是：' + result, DURATION.LENGTH_SHORT);
                } else {
                    this.toast.show('未找到指定保存的内容！', DURATION.LENGTH_SHORT);
                }
            } else {
                this.toast.show('查询数据失败', DURATION.LENGTH_SHORT);
            }
        })
    },
    render() {
        return (
            <View style={styles.container}>
                {/** 用于放置顶部的大图片 */}
                <View style={styles.topViewContainer}>
                    <Image source={require('../Swiper/img/1.jpg')}
                           style={styles.topImageStyle}/>
                </View>
                {/** 用于与登录相关的按钮 */}
                <View style={styles.bottomViewContainer}>
                    {/**手机号登录*/}
                    <TouchableOpacity onPress={()=>this.loginByPhone()}>
                        <View style={styles.loginByPhoneBtnContianer}>
                            <Text style={styles.loginByPhoneBtnTitle} >手机号登录</Text>
                        </View>
                    </TouchableOpacity>
                    {/**立即注册*/}
                    <View style={styles.registeredBtnContianer}>
                        <Text style={styles.registeredBtnTitle} onPress={()=>{this.asQuery()}}>立即注册{}</Text>
                    </View>
                    {/**其他登录方式*/}
                    <View style={styles.loginByOtherContianer}>
                        {/**其他登录方式标签*/}
                        <View style={{flexDirection:'row',alignItems: 'center'}}>
                            <View style={styles.loginByOtherLine}></View>
                            <Text style={styles.otherLoginHintLabel}>其他方式登录</Text>
                            <View style={styles.loginByOtherLine}></View>
                        </View>
                        {/**第三方登录标识*/}
                        <View style={styles.socialLoginBtnContianer}>
                            <Image source={require('../Swiper/img/1.jpg')}
                                   style={styles.socialLoginBtnStyle}/>
                            <Image source={require('../Swiper/img/1.jpg')}
                                   style={styles.socialLoginBtnStyle}/>
                            <Image source={require('../Swiper/img/1.jpg')}
                                   style={styles.socialLoginBtnStyle}/>
                            <Image source={require('../Swiper/img/1.jpg')}
                                   style={styles.socialLoginBtnStyle}/>
                            <Image source={require('../Swiper/img/1.jpg')}
                                   style={styles.socialLoginBtnStyle}/>
                        </View>
                    </View>
                </View>
                <Toast ref={toast=>{
                    this.toast=toast
                }}/>
            </View>
        );
    },

    /**
     * 使用手机号进行登录
     */
    loginByPhone :function () {
        //console.log('使用手机号登录');
        this.props.navigator.push(
            {
                component: LoginByPhoneViewController,
                title: '手机号登录',
            }
        );
    }

});



const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FAFAFA',
        flex:1
    },
    //顶部样式
    topViewContainer: {
        flex:3,
        //距离顶部高度
        marginTop:22,
        alignItems:'center',
        justifyContent:'center'
    },
    //底部样式
    bottomViewContainer: {
        flex:2,
        justifyContent:'flex-start',
        alignItems:'center'
    },
    //顶部图片的样式
    topImageStyle:{
        width:screenWidth * 0.5,
        height:screenWidth * 0.5,
    },
    //手机号登录容器样式
    loginByPhoneBtnContianer:{
        backgroundColor:'#FE3232',
        width:screenWidth * 0.5,
        height:35,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5
    },
    //按钮文字样式
    loginByPhoneBtnTitle:{
        color:'white',
        fontSize:18
    },
    //立即注册按钮容器样式
    registeredBtnContianer:{
        width:screenWidth * 0.5,
        height:35,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5,
        borderColor:'#FE3232',
        borderWidth:0.5,
        marginTop:10
    },
    //立即注册按钮文字样式
    registeredBtnTitle:{
        color:'#FE3232',
        fontSize:18
    },
    //其他登录方式的容器
    loginByOtherContianer:{
        width:screenWidth,
        position:'absolute',
        bottom:20,
        alignItems:'center',
        justifyContent:'center',

    },
    //横线
    loginByOtherLine:{
        backgroundColor:'#999999',
        height:1,
        width:screenWidth*0.25,
        marginLeft:10,
        marginRight:10
    },
    //第三方登录按钮容器
    socialLoginBtnContianer:{
        flexDirection:'row',
        marginTop:10

    },
    //第三方登录按钮的样式
    socialLoginBtnStyle:{
        width:40,
        height:40,
        margin:5
    },
    //其他登录方式的提示
    otherLoginHintLabel:{
        color: '#505050',
        fontSize:13
    }
});

module.exports = TouTiaoLoginView;