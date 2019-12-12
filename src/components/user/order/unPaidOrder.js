/*
 * Created by Saul at 2018/06/26
 *
 * 待支付订单
 *
 */

import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert
} from 'react-native'
import { Color, Font } from '../../../constants'
import DynamicList from '../../common/dynamicList'
import api from '../../../utils/api'
import Alipay from '@0x5e/react-native-alipay';



class ListItem extends React.Component {
  state = {
    payResultFromPlatForm: '',
  }

  /*
   * TODO: 支付后期应该单独出一个模块。或可设计成高阶组件
   *
   *
   */
  handlePayAgain = async () => {
    const orderId = this.props.order['order_id']
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
    const { order = {} } = this.props
    const itemArray = order['item_array'] || []

    // 总商品数量
    const itemAmountList = itemArray.map(item => item.amount)
    const itemAmount = itemAmountList.reduce((pre, next) => pre + next)

    return(
      <View>
        {/* 订单单元头 */}
        <View style={styles.orderItemHeaderContainer}>
          {/* 暂时没有供应商头像
          <Image
            style={styles.supplierImg}
            source={require('../../../assets/image/logo.png')}
          />
            */}
          {/* 供应商标题 */}
          <TouchableOpacity
            style={styles.supplierTitleContainer}
            onPress={() => {
              console.log('=====>>>>>Go to Supplier Shop Screen', );
              const payId = order['pay_id']
              const { navigation } = this.props
              navigation.navigate('OrderDetail', { payId })
            }}
          >
            <Text style={styles.supplierTitleText}>{ order['supplier_name'] }</Text>
          </TouchableOpacity>
          {/* 订单状态标识 */}
          <View style={styles.orderStatusContainer}>
            <Text style={styles.orderStatusText}>等待卖家付款</Text>
          </View>
        </View>
        {/* 订单商品列表 */}
        {
          itemArray.map((goodItem, i) => {
            return (
              <View
                key={i}
                style={styles.itemContainer}
              >
                <TouchableOpacity
                  onPress={() => {
                    const payId = order['pay_id']
                    const { navigation } = this.props
                    navigation.navigate('OrderDetail', { payId })
                  }}
                  style={styles.itemInnerContainer}
                >
                  <View
                    style={{
                      padding: 10,
                    }}
                  >
                    <Image style={styles.itemImg}
                      source={{ uri: goodItem['img'].split(',')[0] }}
                    />
                  </View>
                  {/* 商品文本信息 */}
                  <View style={styles.itemTextInfoContainer}>
                    <View style={styles.itemTextInfoContainerLeft}>
                      <Text style={styles.itemTitleText}>{ goodItem['title'] }</Text>
                      <Text style={styles.itemDescText}>{ goodItem['sku'] }</Text>
                    </View>
                    <View style={styles.itemTextInfoContainerRight}>
                      <Text style={styles.currentPriceText}>￥{ goodItem['current_price'] }</Text>
                      <Text style={styles.oldPriceText}>￥{ goodItem['old_price'] }</Text>
                      <Text style={styles.amountText}>x{ goodItem['amount'] }</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )
          })
        }
        {/* 合计信息 */}
        <Text style={styles.orderTotalInfoContainer} >
          <Text style={styles.orderTotalInfoText}>共{ itemAmount }件商品 合计： ￥</Text>
          <Text style={styles.orderTotalInfoText}>{ order['total_price'] }</Text>
        </Text>
        {/* 再次付款 */}
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <TouchableOpacity
            style={styles.payAgainContainer}
            onPress={() => {
              this.handlePayAgain()
            }}
          >
            <Text style={styles.payAgainText}>付款</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}


class UnPaidOrder extends React.Component {
  state = {
    routerPath: '/order?status=1',
    requestParams: null,
  }

  render() {
    return(
      <DynamicList
        style={{
          backgroundColor: '#FFF',
        }}
        requestParams={ this.state.requestParams }
        routerPath={ this.state.routerPath }
        renderItem={({ item, index }) => {
          return (
            <ListItem
              order={ item }
              index={ index }
              navigation={ this.props.navigation }
            />
          )
        }}
      />
    )
  }
}

const styles = StyleSheet.create({
  orderItemHeaderContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderTopWidth: 8,
    borderColor: '#EEE',
    alignItems: 'center'
  },
  supplierImg: {
    width: 30,
    height: 30
  },
  supplierTitleContainer: {
    marginLeft: 10,
    flex: 1,
    // backgroundColor: '#999'
  },
  supplierTitleText: {
    color: Color.black
  },
  orderStatusContainer: {
    paddingVertical: 10,
  },
  orderStatusText: {
    color: Color.primary
  },
  itemContainer: {
  },
  itemInnerContainer: {
    flexDirection: 'row',
    backgroundColor: '#EEE'
  },
  itemImg: {
    borderRadius: 4,
    width: 100,
    height: 100
  },
  itemTextInfoContainer: {
    paddingTop: 10,
    marginLeft: 5,
    paddingRight: 10,
    flex: 1,
    flexDirection: 'row',
    // backgroundColor: 'green'
  },
  itemTextInfoContainerLeft: {
    flex: 1
  },
  itemTextInfoContainerRight: {
    marginRight: 5,
    // backgroundColor: 'red'
  },
  itemTitleText: {
    color: Color.black,
    fontSize: 14,
  },
  itemDescText: {
    color: Color.grey,
    fontSize: Font.tiny
  },
  currentPriceText: {
    textAlign: 'right',
    color: Color.black,
    fontSize: Font.tiny
  },
  oldPriceText: {
    textAlign: 'right',
    color: Color.grey,
    fontSize: Font.tiny,
    textDecorationLine: 'line-through',
  },
  amountText: {
    textAlign: 'right',
    color: Color.grey,
    fontSize: Font.tiny
  },
  orderTotalInfoContainer: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#EEE',
    marginRight: 5,
    paddingVertical: 5,
    textAlign: 'right',
  },
  orderTotalInfoText: {
    color: Color.medium
  },
  payAgainContainer: {
    marginVertical: 5,
    borderRadius: 15,
    marginRight: 10,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: Color.primary
  },
  payAgainText: {
    color: Color.primary,
    fontSize: 12,
  }
})

export default UnPaidOrder;
