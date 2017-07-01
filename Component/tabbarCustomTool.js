/**
 * Created by xzh on 17/5/7.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TabBarIOS,
    NavigatorIOS
} from 'react-native';

// 引入外部的文件

import DXMessage from './DXNewsDetail';

import DXMine from './DXMine';

export default class extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            // 默认选中
            currentSelectedItem: 'home'
        };
    }

    render() {
        return (
            <TabBarIOS
                tintColor="rgba(255, 130, 1, 1.0)"
            >
                {/*首页*/}
                <TabBarIOS.Item
                    icon={require('../Images/about.png')}
                    title="首页"
                    selectedIcon={require('../Images/about.png')}
                    onPress={()=>this.setState({currentSelectedItem: 'home'})}
                    selected={this.state.currentSelectedItem == 'home'}
                >
                    {/*传值问题*/}
                    <DXMessage docid={this.props.docid}/>
                </TabBarIOS.Item>

                {/*我的*/}
                <TabBarIOS.Item
                    icon={require('../Images/about.png')}                    title="我的"
                    selectedIcon={require('../Images/about.png')}
                    onPress={()=>this.setState({currentSelectedItem: 'mine'})}
                    selected={this.state.currentSelectedItem == 'mine'}
                >

                    <DXMine docid={this.props.docid}/>
                </TabBarIOS.Item>

            </TabBarIOS>
        );
    }

    /**
     * 点击了左边的按钮
     * @private
     */
    _clickNavLeftBtn(){
        alert('点击了左边');
    }

    /**
     * 点击了右边的按钮
     */
    _clickNavRightBtn(){
        alert('点击了右边');
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});