/*
 * Created by Saul at 2018/06/11
 *
 * 订单详情
 *
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
  Alert
} from 'react-native'
import { Color, Layout, Font } from '../../../../constants'
import api from '../../../../utils/api'

import OrderStatus from '../OrderStatus'
import OrderAddress from '../OrderAddress'
import OrderSection from '../OrderSection'
import OrderPriceInfo from '../OrderPriceInfo'
import OrderTransactionInfo from '../OrderTransactionInfo'
import OrderMoreAction from '../OrderMoreAction'

class OrderDetailScreen extends React.Component {
  state = {
    isLoading: true,
    orderDetails: [],
    payId: ''
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: '订单详情',
      headerLeft: (
        <TouchableOpacity
          style={{ paddingLeft: 20 }}
          onPress={() => {
            /*
             * TODO: 优化跳转
             *
             *
             */

            // 这里需要优化。当用户已经付款完成之后，返回按钮应该直接略过再次付款页面
            navigation.goBack()
          }}
        >
          <Text style={{ color: Color.white }}>
            返回
          </Text>
        </TouchableOpacity>
      ),
      headerTitleStyle: {
        color: Color.white,
      },
      headerStyle: {
        backgroundColor: Color.primary
      }
    }
  }

  componentDidMount = () => {
    const { navigation } = this.props
    const payInfo  = navigation.state.params || {}
    const { payId } = payInfo
    this.fetchOrderDetail(payId)
  }

  fetchOrderDetail = async (payId) => {
    try {
      const response = await api.get(`/order/detail/${payId}`)
      const orderDetailData = response.data.data
      this.setState({
        isLoading: false,
        orderDetails: orderDetailData
      })
    } catch(error) {
      if(error.data) {
        const message = error.data.data
        return Alert.alert(message)
      }
      return Alert.alert('网络错误')
    }

  }

  render() {
    if(this.state.isLoading) return null
    const { orderDetails } = this.state
    console.log('=====>>>>>orderDetails', orderDetails);
    return(
      <View style={ styles.container } >
        <ScrollView>
          {
            orderDetails.map((orderDetail, i) => {
              const shippingAddressText = orderDetail['shipping_address']
              const orderId = orderDetail['order_id']
              const orderStatusCode = orderDetail.status
              const receiver = orderDetail['receiver']
              const receiverPhone = orderDetail['receiver_phone']
              const supplierName = orderDetail['supplier_name']
              // const supplierLogo = 'http://img.chslab.com:8780/img/Sk0tkvry7.jpeg'
              const itemList = orderDetail['item_array']
              const totalPrice = orderDetail['total_price']
              const unPaid = orderDetail['status'] === 1
              return (
                <View
                  style={{
                    marginBottom: 30,
                  }}
                  key={i}
                >
                  {/* 订单状态 */}
                  <OrderStatus
                    orderStatusCode={orderStatusCode}
                  />
                  {/* 订单地址 */}
                  <OrderAddress
                    receiverPhone={receiverPhone}
                    receiver={receiver}
                    shippingAddressText={shippingAddressText}
                  />
                  {/* 订单章节列表 */}
                  <OrderSection
                    navigation={this.props.navigation}
                    itemList={itemList}
                    // supplierLogo={supplierLogo}
                    supplierName={supplierName}
                  />
                  {/* 订单价格信息 */}
                  <OrderPriceInfo
                    totalPrice={totalPrice}
                  />
                  {/* 更多操作 */}
                  {
                    unPaid &&
                    <OrderMoreAction
                      navigation={this.props.navigation}
                      orderId={orderId}
                    />
                  }
                  {/* 订单交易信息 */}
                  {/*
                  <OrderTransactionInfo />
                  */}
                </View>
              )
            })
          }
        </ScrollView>
        {/* 更多操作 */}
        {/*
        <OrderMoreAction />
        */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'green',
    flexDirection: 'column',
    height: Platform.OS === 'ios' ? (Layout.window.height - 60) : (Layout.window.height - 80),
  }
})

export default OrderDetailScreen;
