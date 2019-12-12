/*
 * Created by Saul at 2018/06/11
 *
 * 确认订单的订单列表
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
import { Color, Layout } from '../../../constants'
import OrderItem from './orderItem'

class OrderList extends React.Component {

  render() {
    const { orders, coupons, priceList } = this.props
    return(
      <View
        style={{
          borderRadius: 10,
        }}
      >
        {
          orders.map((order, i) => {
            return (
              <OrderItem
                // 订单小结
                priceAmount={priceList[i]}
                key={i}
                index={i}
                checkoutFreight={this.props.checkoutFreight}
                checkoutCoupon={this.props.checkoutCoupon}
                onPointExchange={this.props.onPointExchange}
                order={order}
                coupons={coupons}
              />
            )
          })
        }
      </View>
    )
  }
}

export default OrderList;
