/**
 * Created by edagarli on 16/3/16.
 * https://github.com/edagarli
 */
// var React = require('react-native');
var Util = require('./util');

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

var Icon = React.createClass({
    render: function(){
        return (
            <View>
                <View style={styles.go}>
                </View>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    go:{
        borderLeftWidth: 4 * Util.pixel,
        borderBottomWidth: 4 * Util.pixel,
        width:15,
        height:15,
        transform: [{rotate: '45deg'}],
        borderColor:'#FFF',
        marginLeft:10
    }
});

module.exports = Icon;