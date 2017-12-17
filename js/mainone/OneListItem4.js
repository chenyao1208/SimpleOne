/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 * 最顶部的item，摄影和一句话
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Platform,
    TouchableOpacity
} from 'react-native';

import Toast, {DURATION} from 'react-native-easy-toast'

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

var OneListItem4 = React.createClass({

    //初始化变量
    getInitialState() {
        return {
            like: false
        }
    },

    //要传入的参数
    getDefaultProps() {
        return {
            topImgUrl: '顶部图片地址',
            title: '标题',
            picInfo: '标题竖线旁边的作者',
            forward: '下面的一句话',
            wordsInfo: '一句话下面的作者',
            likeNum: 0
        }
    },

    //渲染
    render() {
        return (
            <View style={styles.container}>

                {/*顶部大图*/}
                <TouchableOpacity onPress={() => this.refs.toast.show('click', DURATION.LENGTH_LONG)}>
                    <Image source={{uri: this.props.topImgUrl}} style={styles.topImg}/>
                </TouchableOpacity>
                {/*标题和作者*/}
                <Text style={styles.imgAuthor}>
                    {this.props.title + '|' + this.props.picInfo}
                </Text>
                {/*一句话*/}
                <Text style={styles.textForward}>
                    {this.props.forward}
                </Text>
                {/*一句话的作者*/}
                <Text style={styles.textAuthor}>
                    {this.props.wordsInfo}
                </Text>
                {/*底部小按钮bar*/}
                <View style={styles.bottomBtnsBar}>
                    {/*左边按钮区域*/}

                    <TouchableOpacity style={styles.leftBtn}
                                      onPress={() => this.refs.toast.show('click', DURATION.LENGTH_LONG)}>
                        <View style={{flexDirection: 'row', width: width * 0.2, alignItems: 'center'}}>
                            <Image source={{uri: 'bubble_diary'}} style={styles.bottomBtnsBarIcon}/>
                            <Text style={{
                                fontSize: width * 0.034,
                                marginLeft: width * 0.01,
                            }}>小记</Text>
                        </View>
                    </TouchableOpacity>

                    {/*右边按钮区域*/}
                    <View style={styles.rightBtn}>

                        <TouchableOpacity
                            onPress={() => this.likeClick()}>
                            <Image source={{uri: this.showLikeIcon()}} style={styles.rightBtnIconLeft}/>
                        </TouchableOpacity>

                        <Text style={{position:'relative',left:width * 0.003,bottom:width * 0.016,fontSize: width * 0.024, marginRight: width * 0.03,color:'#A7A7A7'}}>
                            {this.props.likeNum}
                        </Text>

                        <TouchableOpacity style={styles.rightBtnIconCenter}
                                          onPress={() => this.refs.toast.show('click', DURATION.LENGTH_LONG)}>

                            <Image source={{uri: 'stow_default'}} style={styles.rightBtnIconCenter}/>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.rightBtnIconRight}
                                          onPress={() => this.refs.toast.show('click', DURATION.LENGTH_LONG)}>

                            <Image source={{uri: 'share_image'}} style={styles.rightBtnIconRight}/>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.bottomLine}/>

                <Toast
                    ref="toast"
                    style={{backgroundColor: 'gray'}}
                    position='top'
                    positionValue={height * 0.24}
                    textStyle={{color: 'white'}}
                />
            </View>
        );
    },

    //点击喜欢
    likeClick(){
        this.setState({
            like: !this.state.like
        });
    },

    //根据当前状态，显示喜欢图标
    showLikeIcon(){
        //喜欢
        if(this.state.like===true){
            return 'bubble_liked';
        }else{
            return 'bubble_like';
        }
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
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
    topImg: {
        width: width,
        height: height * 0.4,
    },
    imgAuthor: {
        marginTop: width * 0.02,
        color: '#808080',
        fontSize: width * 0.035,
    },
    textForward: {
        width: width * 0.8,
        marginTop: width * 0.06,
        color: '#333333',
        fontSize: width * 0.04,
        lineHeight: parseInt(width * 0.08)
    },
    textAuthor: {
        marginTop: width * 0.08,
        color: '#808080',
        fontSize: width * 0.035,
    },
    bottomBtnsBar: {
        marginTop: width * 0.05,
        flexDirection: 'row',
        alignItems: 'center',
        width: width,
        height: Platform.OS == 'ios' ? height * 0.06 : height * 0.07,
    },
    leftBtn: {
        flexDirection: 'row',
        position: 'absolute',
        left: width * 0.04,
    },
    rightBtn: {
        flexDirection: 'row',
        position: 'absolute',
        right: width * 0.04,
    },
    bottomLine: {
        backgroundColor: '#EEEEEE',
        height: width * 0.016,
        width: width
    },
    bottomBtnsBarIcon: {
        width: width * 0.06,
        height: width * 0.06,
    },
    rightBtnIconLeft: {
        width: width * 0.045,
        height: width * 0.045,
    },
    rightBtnIconCenter: {
        marginRight: width * 0.1,
        width: width * 0.045,
        height: width * 0.045,
    },
    rightBtnIconRight: {
        width: width * 0.045,
        height: width * 0.045,
    },
});

module.exports = OneListItem4;