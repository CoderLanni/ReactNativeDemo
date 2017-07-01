/**
 * Created by zekang on 2017/6/30.
 */


import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    TextInput,
    ListView,
    TouchableOpacity,
    Image,
    ScrollView,
    Text,
    Alert,
    View
} from 'react-native';
import  Video from 'react-native-video'



export default class extends Component  {


        render(){

            return(
                 //方法一:


                 <Video source={{uri: "http://14.29.86.13/vlive.qqvideo.tc.qq.com/n00151ljmvl.p202.5.mp4?sdtfrom=v1010&amp;guid=68f3b8fc1fcc716ee248eba5de706f32&amp;vkey=AB781962EAB8A3E80E7F48B5D1864BCFE4C577B072E96C21A88E032765C2DDCC5F3399F4C846EF005E5017347C5F05369F49C83C1FC833077BCCF336962264F25805A09F04693E6028296F3D6F5CCBFA6FF7AD78C6040BE86A5CCB26F9F20DAA37B3DFBFB84768B4E07BD4E9EB30F10483ECAAB57ABFF271#t=198"}} // Can be a URL or a local file.
                   rate={1.0}                   // 控制暂停/播放，0 代表暂停
                   volume={1.0}                 // 声音的放大倍数，0 代表没有声音，就是静音muted, 1 代表正常音量 normal，更大的数字表示放大的倍数
                   muted={false}                //true代表静音，默认为false.
                   paused={false}               // Pauses playback entirely.
                   resizeMode="cover"           // 视频的自适应伸缩铺放行为，
                   repeat={true}                // 是否重复播放
                   onLoadStart={this.loadStart} // 当视频开始加载时的回调函数
                   onLoad={this.setDuration}    // 当视频加载完毕时的回调函数
                   onProgress={this.setTime}    // 进度控制，每250ms调用一次，以获取视频播放的进度
                   onEnd={this.onEnd}           // 当视频播放完毕后的回调函数
                   onError={this.videoError}    // 当视频不能加载，或出错后的回调函数
                   style={styles.backgroundVideo}
                 />



            );

        }

}

const styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});



