import React from 'react';
import {
    AppRegistry,
    Text,
    Button,
    View,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
var ScrollableTabView = require('react-native-scrollable-tab-view'); //引入控件,并在终端添加依赖    npm install react-native-scrollable-tab-view --save
// var MoveList = require("./movieListView"); //也可以引入一个页面使用
// var MyList = require("./myListView"); //也可以引入一个页面使用
// var Movie = require("./movieList"); //也可以引入一个页面使用

var App = React.createClass({
    render() {
        return (
            <ScrollableTabView
                tabBarPosition='bottom' >
                {/*tabBarPosition   //可以设置顶部或者底部选项*/}
                {/*{...this.props} //指定导航页*/}
                <RecentChatsScreen tabLabel="React" {...this.props} />
                <AllContactsScreen tabLabel="Flow" {...this.props} />

            </ScrollableTabView>
        );
    }
});

class ChatScreen extends React.Component {
    // Nav options can be defined as a function of the screen's props:
    static navigationOptions = ({ navigation }) => ({
        title: `Chat with ${navigation.state.params.user}`,
    });
    render() {
        // The screen's current route is passed in to `props.navigation.state`:
        const { params } = this.props.navigation.state;
        return (
            <View>
                <Text>Chat with {params.user}</Text>
            </View>
        );
    }
}

class RecentChatsScreen extends React.Component {
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Text>List of recent chats</Text>
                <Button
                    onPress={() => navigate('Chat', {user: 'Lucy'})} //Passing params
                    title="Chat with Lucy"
                />
            </View>
        );
    }
}

class AllContactsScreen extends React.Component {
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Text>List of all contacts</Text>
                <Button
                    //跳转
                    onPress={() => navigate('Chat', {user: 'Jane'})} //Passing params
                    title="Chat with Jane"
                />
            </View>
        );
    }
}



App.navigationOptions = {
    title: 'My Chats',
};

const SimpleAppReactNavigation = StackNavigator({
    Home: { screen: App },  //第一栈
    Chat: { screen: ChatScreen },           //第二栈
});


module.export = SimpleAppReactNavigation;