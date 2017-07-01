
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
import DXHome from './DXHome';
import DXFind from './DXFind';
import DXMessage from '../BuyCarComponent/XZHMain';
import DXMine from './AboutMe';

import Login from './TestClass/Login';
import DataTest from './TestClass/DataTest';



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
                    selectedIcon={require('../Images/book.png')}
                    onPress={()=>this.setState({currentSelectedItem: 'home'})}
                    selected={this.state.currentSelectedItem == 'home'}
                >
                    <NavigatorIOS
                        ref='nav'
                        initialRoute={{
                            // 设置初始路由下面的初始板块
                            component:DXHome,
                            title:'网易新闻',
                            leftButtonIcon:{uri:'navigationbar_friendattention_highlighted'},
                            onLeftButtonPress:()=>this._clickNavLeftBtn(),
                            rightButtonTitle:"登录",
                            onRightButtonPress:()=>this._clickNavRightBtn(),
                        }}
                        style={{flex:1}}
                        tintColor="rgba(255, 130, 1, 1.0)"
                    />
                </TabBarIOS.Item>

                {/*消息*/}
                <TabBarIOS.Item
                    icon={require('../Images/book.png')}
                    title="购物"
                    selectedIcon={require('../Images/movie.png')}
                    onPress={()=>this.setState({currentSelectedItem: 'message'})}
                    selected={this.state.currentSelectedItem == 'message'}
                >
                    <NavigatorIOS
                        initialRoute={{
                            // 设置初始路由下面的初始板块
                            component:DXMessage,
                            title:'购物车'
                        }}
                        style={{flex:1}}
                    />
                </TabBarIOS.Item>

                {/*发现*/}
                <TabBarIOS.Item
                    icon={require('../Images/movie.png')}
                    title="发现"
                    selectedIcon={require('../Images/about.png')}
                    onPress={()=>this.setState({currentSelectedItem: 'discover'})}
                    selected={this.state.currentSelectedItem == 'discover'}
                >
                    <NavigatorIOS
                        initialRoute={{
                            navigationBarHidden : "ture",
                            // 设置初始路由下面的初始板块
                            component:DXFind,
                            title:'购物车'
                        }}
                        style={{flex:1}}
                    />

                </TabBarIOS.Item>

                {/*我的*/}
                <TabBarIOS.Item
                    icon={require('../Images/music.png')}
                    title="我的"
                    selectedIcon={require('../Images/movie.png')}
                    onPress={()=>this.setState({currentSelectedItem: 'mine'})}
                    selected={this.state.currentSelectedItem == 'mine'}
                >
                    <NavigatorIOS
                        initialRoute={{
                            // navigationBarHidden:"true",   //隐藏导航栏
                            // 设置初始路由下面的初始板块
                            component:DXMine,
                            title:'个人中心'
                        }}
                        style={{flex:1}}
                    />
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }

    /**
     * 点击了左边的按钮
     * @private
     */
    _clickNavLeftBtn(){
        // alert('点击了左边');
        this.refs.nav.push({

            component:DataTest,    //点击导航右侧的按钮跳转到的页面

        })

    }

    /**
     * 点击了右边的按钮
     */
    _clickNavRightBtn(){
        // alert('点右边');
        this.refs.nav.push({
            title:'登录',
            component:Login,    //点击导航右侧的按钮跳转到的页面

        })
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