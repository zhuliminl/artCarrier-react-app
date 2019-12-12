/*
 * Created by Saul at 2018/06/13
 *
 * 订单交易信息
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
  AlertIOS,
  Platform,
  Text,
} from 'react-native'
import { Color, Layout, Font } from '../../../constants'

class OrderTransactionInfo extends React.Component {

  render() {
    const {
      transaction = {
        id: 23432413232342,
        aipayTransactionId: 23423423432423423,
        created: '2018-06-13'
      }
    } = this.props
    return(
      <View style={styles.container}>
        <Text style={styles.text}>订单编号：{transaction.id}</Text>
        <Text style={styles.text}>支付宝交易号：{transaction.aipayTransactionId}</Text>
        <Text style={styles.text}>创建时间：{transaction.created}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.white,
    padding: 5
  },
  text: {
    color: Color.grey,
    fontSize: Font.tiny,
  }
})

export default OrderTransactionInfo;
