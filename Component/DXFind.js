
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
import  CountDownReact from './CountDowntimer/appDemo';
import Video from './VideoPlay';
//导入数据
// import ShareData from "./shareData.json";
//获取屏幕宽度
let Dimensions = require("Dimensions");
let {width} = Dimensions.get('window');
//常量设置
let cols = 3;
let cellW =width;
let cellH =40;
// let vMargin = (width-cellWH*cols)/(cols+1);
let hMargin = 3;


export default class listViewSpeedDial extends Component {

    constructor(props) {
        super(props);
        //1.设置数据源
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        //2.设置返回数据
        this.state = {
            dataSource: ds.cloneWithRows(['倒计时', '视频', '内容2', '内容3', '内容4', '内容5'])

        };
        thiz = this;


    }

    render() {
        return (
            <ListView
                style={styles.listViewStyle}
                dataSource={this.state.dataSource}
                renderRow={this._renderRow}>

            </ListView>
        );
    }

    _renderRow(rowData, sectionID, rowID, highlightRow) {
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={() => {
                thiz._onPress(rowData)

            }} >
                <View style={styles.innerViewStyle}>

                    <Text >{rowData}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    _onPress(e) {
        if (e == "倒计时"){

            const { navigator} = thiz.props;
            if (navigator) {

                navigator.push({
                    title:'倒计时',
                    component:CountDownReact,
                })
            }

        }
         else if (e == "视频"){

            const { navigator} = thiz.props;
            if (navigator) {

                navigator.push({
                    title:'视频',
                    component: Video,
                })
            }

         }

        else {
            alert(">>>点击 " + e);

        }
    }

}


const styles = StyleSheet.create({
    listViewStyle:{
        // backgroundColor:"#2fb3fd",
        marginTop:30,
        flexDirection:'row',
        flexWrap:'wrap',
    },

    innerViewStyle:{

        backgroundColor:"#2fb3fd",
        width:cellW,
        height:cellH,
        // marginLeft:vMargin,
        marginTop:hMargin,
        alignItems:'center',
    }
});

