/**
 * Created by edagarli on 16/3/16.
 * https://github.com/edagarli
 */
// var React = require('react-native');
var Util = require('./util');
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TabBarIOS,
    TextInput
} from 'react-native';

var Search = React.createClass({
    render: function(){
        return (
            <View style={styles.flex_1}>
                <TextInput style={[styles.flex_1, styles.input]} {...this.props}/>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    flex_1:{
        flex:1
    },
    input:{
        borderWidth:Util.pixel,
        height:40,
        borderColor:'#DDDDDD',
        paddingLeft:5
    }
});

module.exports = Search;