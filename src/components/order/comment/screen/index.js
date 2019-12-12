/*
 * Created by Saul at 2018/07/05
 *
 * 订单评价
 *
 */

import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
  Image,
} from 'react-native'
import { Color, Layout, Font } from '../../../../constants'
import Toast from '../../../common/toast'
import api from '../../../../utils/api'
import Header from './Header'
import CommentLevel from '../CommentLevel'
import CommentInput from '../CommentInput'
import ItemDisplay from '../ItemDisplay'
// 暂时不做匿名和店铺评分
// import CommentWhetherAnonymous from '../CommentWhetherAnonymous'
// import CommentGrade from '../CommentGrade'


const commentPlaceHolder = '宝贝满足你的期待吗？'

class CommentScreen extends React.Component {
  state = {
    // 当前商品信息
    item: null,
    // 商品评分
    orderPraiseLevel: 2,
    commentText: commentPlaceHolder,
    // 媒体信息
    imgData: [],
    videoData: '',

    // 暂时不做
    isAnonymous: false,

    // 店铺评分
    // supplierPraiseLevel: {
      // // 范围 0~4
      // descMatchLevel: 0,
      // logisticServiceLevel: 3,
      // serviceAttitude: 2
    // },

    // 商品图片
    // itemImg: "http://img.chslab.com:8780/img/HJvsU7QIG.jpeg",
    // 允许用户提交
    idReadyToUpload: false,
  }

  static navigationOptions = () => {
    return {
      header: null
    }
  }

  componentDidMount = () => {
    this.setItemInfo()
  }

  setItemInfo = () => {
    const { navigation } = this.props
    const item = navigation.state.params || {}
    this.setState({
      item
    })
  }

  // 提交评价
  handleCommentSubmit = async () => {
    const { item, commentText, orderPraiseLevel, imgData } = this.state

    if(commentText === commentPlaceHolder) {
      return Alert.alert('请输入评论内容')
    }

    const params = {
      // 后台的格式要求如此
      comment: [{
        ...item,
        star: orderPraiseLevel,
        comments: commentText,
        img: imgData,
      }]
    }

    console.log('=====>>>>>即将提交的评论数据', params);

    try {
      const response = await api.post('/comment', { ...params })
      const result = response.data.result
      if(result === "ok") {
        return Toast.show('评价提交成功')
      }
      console.log('=====>>>>>订单评价提交成功返回结果', response);

    }catch(error) {
      console.log('=====>>>>>订单商品提交失败', JSON.parse(JSON.stringify(error)));
    }


  }


  // 处理订单好评
  handleOrderPraise = (level) => {
    this.setState({
      orderPraiseLevel: level
    })
  }
  // 处理评价内容文字
  handleCommentTextInput = () => {
  }

  // 处理店铺各项评分
  handleSupplierPraiseLevelChange = (i, praiseType) => {
    this.setState({
      supplierPraiseLevel: {
        ...this.state.supplierPraiseLevel,
        [praiseType]: i,
      }
    })
  }

  handleCommentTextChange = (text) => {
    this.setState({
      commentText: text
    })
  }

  handleToggleAnonymous = () => {
    this.setState({
      isAnonymous: !this.state.isAnonymous
    })
  }

  handleBase64Upload = base64 => {
    console.log('=====>>>>>获取一个 base64 数据', base64);
    const { imgData } = this.state
    imgData.push(base64)
    this.setState({
      imgData
    })
  }

  render() {
    console.log('=====>>>>>评论页商品展示', this.state.item);
    return(
      <ScrollView>
        <Header
          onCommentSubmit={this.handleCommentSubmit}
        />
        {/* 商品展示 */}
        <ItemDisplay
          item={this.state.item}
        />
        {/* 好评 */}
        <CommentLevel
          orderPraiseLevel={this.state.orderPraiseLevel}
          onOrderPaise={this.handleOrderPraise}
          // itemImg={this.state.itemImg}
        />
        {/* 评价输入 */}
        <CommentInput
          commentText={this.state.commentText}
          onChangeText={this.handleCommentTextChange}
          onCommentTextInput={this.handleCommentTextInput}
          onBase64Upload={this.handleBase64Upload}
        />
        {/* 是否匿名
        <CommentWhetherAnonymous
          isAnonymous={this.state.isAnonymous}
          onToggleAnonymous={this.handleToggleAnonymous}
        />
            */}
        {/* 店铺评分
        <CommentGrade
          supplierPraiseLevel={this.state.supplierPraiseLevel}
          onSupplierPraiseLevelChange={this.handleSupplierPraiseLevelChange}
        />
            */}
      </ScrollView>
    )
  }
}

export default CommentScreen;
