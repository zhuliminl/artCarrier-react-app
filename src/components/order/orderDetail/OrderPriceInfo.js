
/*
 * Created by Saul at 2018/06/13
 *
 * 订单价格信息
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

class OrderPriceInfo extends React.Component {

  render() {
    return(
      <View style={styles.container}>
        {/* 运费 */}
        {/*
        <View style={styles.cellContainer}>
          <Text style={styles.cellLeftText}>运费</Text>
          <Text style={styles.cellRightText}>￥00.00</Text>
        </View>
        <View style={styles.cellContainer}>
          <Text style={styles.cellLeftText}>5元优惠券</Text>
          <Text style={styles.cellRightText}>￥10.00</Text>
        </View>
        <View style={styles.cellContainer}>
          <Text style={styles.cellLeftText}>积分抵扣</Text>
          <Text style={styles.cellRightText}>-￥5.00</Text>
        </View>
        */}

        {/* 实际付款 */}
        <View style={styles.cellContainer}>
          <Text style={styles.cellLeftPrimaryText}>实际付款</Text>
          <Text style={styles.cellRightPrimaryText}>￥{ this.props.totalPrice }</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  cellContainer: {
    paddingVertical: 3,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cellLeftText: {
    color: Color.medium,
    fontSize: Font.tiny
  },
  cellRightText: {
    textAlign: 'right',
    color: Color.medium,
    fontSize: Font.tiny
  },
  cellLeftPrimaryText: {
    color: Color.medium,
    fontSize: 12,
  },
  cellRightPrimaryText: {
    textAlign: 'right',
    color: Color.secondary,
    fontSize: Font.small
  }
})

export default OrderPriceInfo;
