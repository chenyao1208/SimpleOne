/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow 作者详情页
 */

import React, {Component} from 'react';
import PullScollView from '../view/PullScollView';
import Toast, {DURATION} from 'react-native-easy-toast';
import NetUtil from '../util/NetUtil';
import AuthorHead from './AuthorHead';
// 加载更多的view
import LoadingMore from '../view/LoadingMore';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Platform,
    TouchableOpacity,
} from 'react-native';
import constants from '../Constants';
import OneListTop from '../mainone/OneListTop';
import OneListCommon from '../mainone/OneListCommon';
import OneListMusic from '../mainone/OneListMusic';
import OneListMovie from '../mainone/OneListMovie';
import OneListAudio from '../mainone/OneListAudio';

var ServerApi = require('../ServerApi');
var {width, height} = constants.ScreenWH;

var itemArr = [];
var key = 0;
var pageNum = 0;
var workList=[];

class AuthorPage extends Component{
    constructor(props){
        super(props);
        this.onScroll=this.onScroll.bind(this);
        this.onPullRelease=this.onPullRelease.bind(this);
        this.state={
            loading: false,
            isEnd: false//是否到末尾标记
        }
    }

    componentDidMount() {
        this.reset();
        this.getWorkList();
    }

    reset(){
        key=0;
        itemArr = [];
        workList= [];
        pageNum = 0;
    }

    getWorkList() {
        var url = ServerApi.AuthorPage.replace('{author_id}', this.props.route.params.authorData.user_id);
        url = url.replace('{page_num}', pageNum);
        console.log('加载页数' + pageNum);
        console.log("地址" + url);
        NetUtil.get(url, null, (result) => {

            workList = result.data;

            this.loadMoreView();

            this.setState({
                loading: false,

            });

            if(result.data.length<10){
                this.setState({
                    isEnd: true,
                });
            }
            console.log('当前数量' + workList.length);
        }, (error) => {
            this.refs.toast.show('error' + error, 500)
        });
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderNavBar()}

                <PullScollView onPullRelease={this.onPullRelease} onScroll={this.onScroll}
                          style={{width: width, backgroundColor: 'white'}}>
                    <AuthorHead data={this.props.route.params.authorData}/>
                    <View style={styles.bottomLine}/>

                    {this.renderAllItem()}
                    {this.renderLoading()}
                </PullScollView>
                <Toast
                    ref="toast"
                    style={{backgroundColor: 'gray'}}
                    position='top'
                    positionValue={height * 0.4}
                    textStyle={{color: 'white'}}
                />
            </View>

        );
    }

    /**
     * 显示正在加载
     */
    renderLoading() {

        return (
            <LoadingMore loading={this.state.loading}/>
        );
    }

    // 刷新释放回调
    onPullRelease(resolve) {
        //do something
        console.log('作者页调刷新');
        //发起请求
        this.getWorkList();
        setTimeout(() => {
            resolve();
        }, 3000);

    }

    /**
     * scrollview滑动回调
     */
    onScroll(event) {
        let y = event.nativeEvent.contentOffset.y;
        // console.log('滑动距离' + y);
        let height = event.nativeEvent.layoutMeasurement.height;
        // console.log('列表高度' + height);
        let contentHeight = event.nativeEvent.contentSize.height;
        // console.log('内容高度' + contentHeight);
        // console.log('判断条件' + (y + height));
        if (y + height >= contentHeight - 20) {
            console.log('触发加载更多');
            if(!this.state.isEnd){
                pageNum++;

                console.log('当前页数' + pageNum);
                this.getWorkList();
                //设置正在加载和更多列表标记
                this.setState({
                    loading: true,
                });
            }


        }
    }

    loadMoreView() {
        if (workList.length != 0) {
            for (var i = 0; i < workList.length; i++) {
                //取出每一条数据
                var data = workList[i];
                //最顶部的摄影和一句话
                if (data.category == 0) {
                    //组件绑定数组
                    itemArr.push(
                        <OneListTop key={key}
                                    data={data}
                                    navigator={this.props.navigator}/>
                    );

                }

                //音乐
                else if (data.category == 4) {
                    itemArr.push(
                        <OneListMusic key={key} data={data} navigator={this.props.navigator}/>
                    );
                }
                //电影
                else if (data.category == 5) {
                    itemArr.push(
                        <OneListMovie key={key} data={data} navigator={this.props.navigator}/>
                    );
                }
                //电台
                else if (data.category == 8) {
                    itemArr.push(
                        <OneListAudio key={key} data={data} navigator={this.props.navigator}/>
                    );
                }
                //普通item
                else {
                    itemArr.push(
                        <OneListCommon key={key}
                                       navigator={this.props.navigator}
                                       data={data}/>
                    );
                }
                key++;
                itemArr.push(
                    <View key={key} style={styles.bottomLine}/>
                );

                key++;
                console.log('渲染view' + itemArr.length);

            }

        }
    }

    /**
     * 列表item渲染
     * @param oneData
     * @returns {Array}
     */
    renderAllItem() {
        return itemArr;
    }

    /**
     * 渲染顶部导航
     */
    renderNavBar() {
        return (
            // 顶部导航bar
            <View style={styles.outNav}>

                {/*左边按钮*/}
                <TouchableOpacity style={styles.leftBtn}
                                  onPress={() => this.props.navigator.pop()}>
                    <Image source={{uri: 'icon_back'}} style={styles.navLeftBar}/>
                </TouchableOpacity>

                <Text style={styles.title}>{this.props.route.params.authorData.user_name}</Text>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    outNav: {
        height: Platform.OS == 'ios' ? height * 0.07 : height * 0.08,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        width: width,
        justifyContent: 'center',
        borderBottomColor: '#dddddd',
        borderBottomWidth: constants.divideLineWidth
    },
    leftBtn: {
        position: 'absolute',
        left: width * 0.024,
    },
    navLeftBar: {
        width: height * 0.04,
        height: height * 0.05,
    },
    title: {
        fontSize: width * 0.04,
        color: '#414141',
        fontWeight: 'bold'
    },
    bottomLine: {
        backgroundColor: '#EEEEEE',
        height: width * 0.024,
        width: width
    },
});

export default AuthorPage;