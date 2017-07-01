/**
 * Created by xzh on 17/5/7.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    NavigatorIOS
} from 'react-native';

import Lay from '../myTestSrc/LayoutExercises'

export default class extends Component {
    render() {
        if (this.props.docid){
            return (


                <View style={styles.container}>

                    <TouchableOpacity style={styles.cellStyle} onPress={()=>this._pushToNewsDetail()}>
                        <Text style={styles.btnText}>
                            我是按钮
                        </Text>
                    </TouchableOpacity>


                </View>
            );
        }
        else {

            return (

                <View style={styles.container}>

                        <Text style={styles.btnText}>
                            个人中心
                        </Text>
                </View>

            );
        }

    }

    //设置下一页面的属性
    _pushToNewsDetail(){
        this.props.navigator.push({
            component:Lay,

            title:"新情"
        })

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'orange',
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
    btn: {
        width: 100,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },

    btnText: {
        fontSize: 18
    }
});