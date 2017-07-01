/**
 * Created by xzh on 17/5/7.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableOpacity,
    PixelRatio,
    TabBarIOS
} from 'react-native';

// 引入外部的文件
import DXSwiper from './Swiper/index';
import DXNewsDetail from './DXNewsDetail';

import Lay from '../myTestSrc/LayoutExercises';
import PullRefreshScrollView from 'react-native-pullrefresh-scrollview';
export default class extends Component {
    static defaultProps = {
        api_url: 'http://c.m.163.com/nc/article/headline/T1348647853363/0-20.html?from=toutiao&fn=1&prog=LTitleA&passport=&devId=nTM86EPlcxZu09VdpTEh6aR3%2B%2FQX6x8vHBD3ne3k5bbgOrg%2FIP5DcguSDmtYyWbs&offset=0&size=20&version=14.0&spever=false&net=wifi&lat=DUH4Hf95lyIDaAI03C3RSA%3D%3D&lon=HJ4tj6FL5wRHQxcf5GLEcg%3D%3D&ts=1470728804&sign=1H8K3yy9bMXakmxAlZ9P86meraJtjKQFz5vJuwhjNyl48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore',
        key_word: 'T1348647853363'
    };

    // 构造
      constructor(props) {
        super(props);

        // 1. 数据源
        var ds = new ListView.DataSource({
           rowHasChanged: (r1, r2) => r1 !== r2
        });

        // 初始状态
        this.state = {
            dataSource:ds,
            // 广告
            headerAdArr:[],
            // 判定
            flag: false,

            /*刷新*/
            load:false,
            currentPage:1,

        };
      }

    render() {
        return (


            <ListView automaticallyAdjustContentInsets={false}
        renderScrollComponent={(props) => <PullRefreshScrollView style={[{marginTop:60},{marginBottom:10}]}  useLoadMore={1} onLoadMore={(PullRefresh)=>this.onLoadMore(PullRefresh)} {...props} onRefresh={(PullRefresh)=>this.onRefresh(PullRefresh)} {...props}     />}

        dataSource={this.state.dataSource}
        renderHeader={this._renderHeader.bind(this)}
        renderRow={this._renderRow.bind(this)}
    />
        );
    }
    // 请求网络结束下拉刷新状态
    onRefresh(PullRefresh){
        // PullRefresh.onRefreshEnd();
        fetch(this.props.api_url)
            .then((response)=> response.json())
            .then((responseJson) => {
                // 1. 取出数组
                const dataArr = responseJson[this.props.key_word];
                // 临时数组
                var tempListArr = [], adArr = [];

                // 2. 遍历数组
                dataArr.forEach((value, index)=>{
                    if(value.hasAD == 1 || value.hasHead == 1){
                        adArr = value.ads;
                    }else {
                        tempListArr.push(value);
                    }

                    PullRefresh.onRefreshEnd();
                });

                // 3. 更新状态机,刷新UI
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(tempListArr),
                    // 广告
                    headerAdArr:adArr,
                    flag:true
                });
            })
            .catch((error)=>{
                alert('您的网络有问题哟~');
            })
    }
    // 请求网络数据将加载更多数据状态改为已加载完成
    onLoadMore(PullRefresh){
        // PullRefresh.onLoadMoreEnd();
        fetch(this.props.api_url)
            .then((response)=> response.json())
            .then((responseJson) => {
                // 1. 取出数组
                const dataArr = responseJson[this.props.key_word];
                // 临时数组
                var tempListArr = [], adArr = [];

                // 2. 遍历数组
                dataArr.forEach((value, index)=>{
                    if(value.hasAD == 1 || value.hasHead == 1){
                        adArr = value.ads;
                    }else {
                        tempListArr.push(value);
                    }

                    PullRefresh.onLoadMoreEnd();
                });

                // 3. 更新状态机,刷新UI
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(tempListArr),
                    // 广告
                    headerAdArr:adArr,
                    flag:true
                });
            })
            .catch((error)=>{
                alert('您的网络有问题哟~');
            })
    }

    componentDidMount() {
        fetch(this.props.api_url)
            .then((response)=> response.json())
            .then((responseJson) => {
                // 1. 取出数组
                const dataArr = responseJson[this.props.key_word];
                // 临时数组
                var tempListArr = [], adArr = [];

                // 2. 遍历数组
                dataArr.forEach((value, index)=>{
                    if(value.hasAD == 1 || value.hasHead == 1){
                        adArr = value.ads;
                    }else {
                        tempListArr.push(value);
                    }
                });

                // 3. 更新状态机,刷新UI
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(tempListArr),
                    // 广告
                    headerAdArr:adArr,
                    flag:true
                });
            })
            .catch((error)=>{
                alert('您的网络有问题哟~');
            })
    }

    /**
     * 返回具体的行
     * @private
     */
    _renderRow(rowData){
        // 0. 防止空数据
        if(!this.state.flag) return;

        return(
            <TouchableOpacity style={styles.cellStyle} onPress={()=>this._pushToNewsDetail(rowData.docid)}>
                <Image
                    source={{uri: rowData.imgsrc}}
                    defaultSource={{uri: 'placeholder'}}
                    style={styles.imgStyle}
                />
                <View style={styles.rightViewStyle}>
                    <Text
                        numberOfLines={2}
                    >
                        {rowData.title}
                    </Text>
                    <View style={styles.rightInnerViewStyle}>
                        <Text style={{color:'red', fontSize:14}}>{rowData.source}</Text>
                        <Text style={{color:'#333', fontSize:14}}>{rowData.ptime}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    //设置下一页面的属性
    _pushToNewsDetail(docid){

        this.props.navigator.push({
            component:DXNewsDetail,
            passProps:{docid},
            rightButtonTitle:"个中",
            onRightButtonPress:()=>this._clickNavRightBtn(),
            title:"新闻详情"
        })

    }
    /**
     * 点击了右边的按钮
     */
    _clickNavRightBtn(){
        // alert('点击了右边');

        //设置下一页面的属性
            this.props.navigator.push({
                component:Lay,

                title:"新情"
            })




    }


    /**
     * 返回头部视图
     * @private
     */
    _renderHeader(){
        // 0. 防止空数据
        if(!this.state.flag) return;
        
        // 1.容错
        if(this.state.headerAdArr.length == 0) return;
        return(
            <DXSwiper dataArr={this.state.headerAdArr}/>
        )
    }

}

const styles = StyleSheet.create({
    cellStyle:{
        borderBottomWidth: 1/PixelRatio.get(),
        borderBottomColor: '#666',

        flexDirection:'row',
        padding:10
    },

    imgStyle:{
        width:90,
        height:90,
        borderRadius:5,
        marginRight:10
    },

    rightViewStyle:{
        flex:1,
        justifyContent:'space-around'
    },

    rightInnerViewStyle:{
        flexDirection:'row',
        justifyContent:'space-between'
    }
});