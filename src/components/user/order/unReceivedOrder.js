/*
 * Created by Saul at 2018/06/26
 *
 * 待收货订单
 * 可查看物流
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
import DynamicList from '../../common/dynamicList'
import { Color, Font } from '../../../constants'
import LogisticsModal from './LogisticsModal'
import api from '../../../utils/api'
import Toast from '../../common/toast'



class ListItem extends React.Component {

  confirmReceipt = async () => {
    const orderId = this.props.order['order_id']
    try {
      const res = await api.post('/order/receipt', {
        order_id: orderId,
      })
      console.log('=====>>>>>确认收货成功', res);
      return Alert.alert('确认收货成功')
    } catch(error) {
      console.log('确认收货失败', JSON.parse(JSON.stringify(error)))
      // console.log('确认收货失败', error.message)
      return Toast.show('网络错误')
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
          {/*
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
            }}
          >
            <Text style={styles.supplierTitleText}>{ order['supplier_name'] }</Text>
          </TouchableOpacity>
          {/* 订单状态标识 */}
          <TouchableOpacity style={styles.orderStatusContainer}>
            <Text style={styles.orderStatusText}>查看物流</Text>
          </TouchableOpacity>
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
          <Text style={styles.orderTotalInfoText}>{order['total_price']}</Text>
        </Text>
        {/* 确认收货 */}
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <TouchableOpacity
            style={styles.confirm}
            onPress={() => {
              this.confirmReceipt()
            }}
          >
            <Text style={styles.confirmText}>确认收货</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}


class UnReceivedOrder extends React.Component {
  state = {
    routerPath: '/order?status=3',
    requestParams: null,
  }

  render() {
    return(
      <DynamicList
        style={{
          backgroundColor: '#FFF',
        }}
        messageWhileEmptyList={'暂无待收货信息'}
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
  confirm: {
    marginVertical: 5,
    borderRadius: 15,
    marginRight: 10,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: Color.primary
  },
  confirmText: {
    color: Color.primary,
    fontSize: 12,
  }
})

export default UnReceivedOrder;
