/*
 * Created by Saul at 2018/06/15
 *
 * 选择付款方式
 *
 */

import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  StyleSheet,
  Animated,
  Easing,
  AlertIOS,
  Platform,
  Text,
  Alert,
  Toast,
} from 'react-native'
import { Color, Font, Layout } from '../../../constants'
import CheckBox from '../../common/checkBox'


class ChoosePayType extends React.Component {
  state = {
    isShowPayTypeList: false
  }

  toggleList = () => {
    this.setState({
      isShowPayTypeList: !this.state.isShowPayTypeList
    })
  }


  render() {
    const { onChangePayType, payType } = this.props

    let payTypeText;
    switch(payType) {
      case 'alipay' :
        payTypeText = '支付宝'
        break;
      case 'wechat' :
        payTypeText = '微信'
        break;
      case 'balance' :
        payTypeText = '余额'
        break;
    }

    return(
      <View>
        <TouchableOpacity
          style={styles.headerContainer}
          onPress={() => {
            this.setState({
              isShowPayTypeList: !this.state.isShowPayTypeList
            })
          }}
        >
          <Text style={styles.headerText}>
            选择付款方式
          </Text>
          <Text>
            { !this.state.isShowPayTypeList && `正在使用${payTypeText}支付`}
          </Text>
          <Image
            style={{
              width: 20,
              height: 20,
              transform: [
                {
                  rotate: this.state.isShowPayTypeList ? "90deg" : "0deg"
                }
              ]

            }}
            source={require('../../../assets/icon/arrow.png')}
          />
        </TouchableOpacity>
        {/* 选择支付方式的列表 */}
        {
          this.state.isShowPayTypeList &&
          <View>

            {/* 支付宝支付 */}
            <View style={styles.payTypeContainer}>
              <Image
                style={styles.payTypeIcon}
                source={require('../../../assets/icon/alipay.png')}
              />
              <Text style={styles.payTypeText}>支付宝</Text>
              <CheckBox
                style={styles.checkBox}
                isChecked={payType === 'alipay'}
                onClick={() => {
                  onChangePayType('alipay')
                  this.toggleList()
                }}
              />
            </View>
            {/* 微信支付需要申请接口

            <View style={styles.payTypeContainer}>
              <Image
                style={styles.payTypeIcon}
                source={require('../../../assets/icon/wechat.png')}
              />
              <Text style={styles.payTypeText}>微信</Text>
              <CheckBox
                style={styles.checkBox}
                isChecked={payType === 'wechat'}
                onClick={() => {
                  onChangePayType('wechat')
                  this.toggleList()
                }}
              />
            </View>

                */}
            {/* 余额支付 */}
            <View style={styles.payTypeContainer}>
              <Image
                style={styles.payTypeIcon}
                source={require('../../../assets/icon/balance.png')}
              />
              <Text style={styles.payTypeText}>余额</Text>
              <CheckBox
                style={styles.checkBox}
                isChecked={payType === 'balance'}
                onClick={() => {
                  onChangePayType('balance')
                  this.toggleList()
                }}
              />
            </View>

          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    borderTopColor: '#EEE',
    borderTopWidth: 0.5,
    flexDirection: 'row',
    backgroundColor: Color.white,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  headerText: {
    flex: 1,
    fontSize: Font.small,
    color: Color.black
  },
  payTypeContainer: {
    borderTopWidth: 0.5,
    borderTopColor: '#EEE',
    paddingHorizontal: 10,
    backgroundColor: Color.white,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center'
  },
  payTypeIcon: {
    marginVertical: 5,
    marginRight: 10,
    width: 40,
    height: 40
  },
  payTypeText: {
    flex: 1
  },
  checkBoxContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  checkBox: {
    justifyContent: 'flex-end'
  }
})

export default ChoosePayType;
