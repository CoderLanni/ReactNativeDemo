/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


/*
* 案例博客 :  http://yiweifen.com/html/news/WaiYu/105343.html
* */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    DeviceEventEmitter
} from 'react-native';

import XZHBottomView from './XZHBottomView';
import XZHWineCell from  './XZHWineCell';

var data = require('./data.json');

export default class extends Component {
    // 构造
    constructor(props) {
        super(props);

        // 创建数据源
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        // 初始状态
        this.state = {
            dataArr: data,
            dataSource: ds
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData)=> this._renderRow(rowData)}
                    contentInset={{bottom: 44}}
                />
                <XZHBottomView style={styles.bottomViewStyle}/>
            </View>
        );
    }

    _renderRow(rowData){
        return(
            <XZHWineCell wine={rowData} />
        )
    };

    componentWillMount() {
        for (var i = 0; i < data.length; i++) {
            // 1. 取出单个对象
            var item = data[i];
            // 2. 定义购买数量 并 插入对象
            item.buyNum = 0;
        }

        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.state.dataArr)
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e8e8e8',
    },

    bottomViewStyle: {}
});