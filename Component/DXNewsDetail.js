/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    WebView,

} from 'react-native';

// http://c.m.163.com/nc/article/BVF9NM4100051CD5/full.html

import Util from './Util';

var NewsDetail = React.createClass({
    getInitialState(){
        return{
            html:'正在加载网页~'

        }
    },

    render() {
        return (

            <WebView
                automaticallyAdjustContentInsets={true}
                source={{html: this.state.html, baseUrl: ''}}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
            />


        );
    },

    componentDidMount(){
        this.getDataFromNet();
    },


    getDataFromNet(){
        var url_api = 'http://c.m.163.com/nc/article/'+ this.props.docid +'/full.html';
        console.log(this.props.docid);
        Util.get(url_api, (responseData)=>{
            // 取出所有的数据
            var allData = responseData[this.props.docid];
            console.log(allData);

            // 取出body中的数据
            var body = allData['body'];

            // 取出图片数组
            var img = allData['img'];
            console.log(img);

            for(var i=0; i<img.length; i++){
                var item = img[i];
                var ref = item.ref;
                var src = item.src;
                var newImg = '<img src="'+ src +'" width="100%">';
                body = body.replace(ref, newImg);
                console.log(ref, src);

            }

            // 更新UI
            this.setState({
                html: body
            });
        }, (error)=>{
            alert(error);
        })
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});

module.exports = NewsDetail;


