/*
 * Created by Saul at 2018/06/13
 *
 * 底部的更多操作：取消订单和支付
 *
 */


import React from 'react'
import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  StyleSheet,
  Animated,
  Easing,
  Alert,
  Platform,
  Text,
} from 'react-native'
import { Color, Layout, Font } from '../../../constants'
import api from '../../../utils/api'
import Alipay from '@0x5e/react-native-alipay';

class OrderMoreAction extends React.Component {
  state = {
    payResultFromPlatForm: '',
  }

  payAgain = async () => {
    const { orderId } = this.props
    console.log('=====>>>>>再次付款', );
    try {
      const response = await api.post('/order/pay', {
          type: 'item',
          order_id: orderId,
      })

      // console.log('=====>>>>>再次支付所获得的 payData', payData);
      const payData  = response.data.data
      const orderStr = payData['pay_params']
      const payId = payData['pay_id']
      this.payWithAlipay(orderStr, payId)

    }catch(error) {
     return  console.log('订单提交错误', JSON.parse(error))
    }
  }

  // 支付宝支付
  payWithAlipay = async (orderStr, payId) => {
    try {
      let response = await Alipay.pay(orderStr)
      // 截取支付宝返回的信息。错误结果采取本地解决，不通知给服务器
      // 只把成功的结果通知给服务器
      const { memo, resultStatus, result: resultStr } = response
      // if(resultStatus === '9000') {
      if(true) {
        // 虽然支付宝能返回支付状态结果，
        // 但是要求 最终的 订单状态还是以通知过后台服务器并以后台的返回结果为准
        this.setState({ payResultFromPlatForm: JSON.parse(resultStr) },
          () => {
            console.log('=====>>>>>支付成功数据', this.state.payResultFromPlatForm);
            this.notifyToServer(response)
          }
        )
      } else {
        // 暂时不考虑支付结果未知，如 status = 8000 的状态
        Toast.show(memo, Toast.LONG)
        Alert.alert('支付结果未知')
      }
    } catch (error) {
      console.log('=====>>>>>支付再次失败', JSON.stringify(error));
      Alert.alert('支付失败 ',)
    }
  }

  // 回传支付结果通知给后台
  notifyToServer = async (data) => {
    try {
      const response = await api.post('/payreturn', { ...data })
      const payResultFromServer = response.data.data

      // 预期 payResultFromServer = { pay_status : "success/failure", pay_id: '1234' }
      console.log('=====>>>>>从后端传回的支付结果', payResultFromServer);

      // 解析最终结果，反馈给用户
      // 无论支付成功失败与否都将重定向到订单详情页
      // 需要 传递 pay_id 作为请求依据
      const { navigation } = this.props
      navigation.navigate('OrderDetail', { payId: payResultFromServer['pay_id'] })
    } catch(error) {
      console.log('=====>>>>>发送支付结果给服务器错误', JSON.stringify(error));
      if(error.data) {
        const data = error.data
        const message = data.message
        return Alert.alert(message)
      }
      return Alert.alert('网络错误')
    }

  }

  render() {
    return(
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            console.log('订单详情的更多操作')
          }}
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonText}>
            取消订单
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // 再次付款默认支付宝方式
            this.payAgain()
          }}
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonText}>
            重新付款
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // height: 60,
    height: Platform.OS === 'ios' ? 60 : 50,
    borderTopWidth: 0.5,
    borderColor: '#F5F6F7',
    backgroundColor: Color.white,
    justifyContent: 'flex-end'
  },
  buttonContainer: {
    marginRight: 10,
    borderWidth: 0.5,
    borderColor: '#EEE',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 20,
    justifyContent: 'center',
  },
  buttonText: {
    color: Color.medium,
    fontSize: Font.small
  }
})

export default OrderMoreAction;
