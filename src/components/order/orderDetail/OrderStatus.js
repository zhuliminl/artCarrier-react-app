/*
 * Created by Saul at 2018/06/13
 *
 * 订单状态信息
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

class OrderStatus extends React.Component {

  render() {

    const { orderStatusCode } = this.props
    let statusText;
    switch(orderStatusCode) {
      case 1:
        statusText = '等待卖家付款'
        break;
      case 2:
        statusText = '已付款'
        break;
      case 3:
        statusText = '待收货'
        break;
      case 4:
        statusText = '已完成'
        break;
    }
    return(
      <View style={styles.container}>
        <ImageBackground
          source={require('../../../assets/image/bg_order_status.png')}
          style={styles.statusBg}
        >
          <View style={styles.statusContainer}>
            <Text style={styles.statusPrimaryText}>{ statusText }</Text>
            {/*
            <Text style={styles.statucSecondText}> 剩余23小时自动关闭 </Text>
            */}
          </View>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
  },
  statusContainer: {
    paddingLeft: 20
  },
  statusBg: {
    width: Layout.window.width,
    height: 100,
    justifyContent: 'center'
  },
  statusPrimaryText: {
    color: Color.white,
    fontSize: Font.medium,
  },
  statucSecondText: {
    color: Color.white,
    fontSize: Font.tiny,
  }
})

export default OrderStatus;
