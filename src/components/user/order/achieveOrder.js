/*
 * Created by Saul at 2018/06/26
 *
 * 已完成订单
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
import CommentModal from './CommentModal'

class ListItem extends React.Component {
  state = {
    currentModal: {
      index: '',
      isShow: false,
    }
  }

  handleToggleModal = (index) => {
    this.setState({
      currentModal: {
        index,
        isShow: !this.state.currentModal.isShow,
      }
    })
  }

  navigateToComment = ({ params }) => {
    const { navigation } = this.props
    navigation.navigate('OrderComment', params)
  }

  render() {
    const { order = {} } = this.props
    const itemArray = order['item_array'] || []

    // 总商品数量
    const itemAmountList = itemArray.map(item => item.amount)
    const itemAmount = itemAmountList.reduce((pre, next) => pre + next)
    const { currentModal } = this.state
    console.log('=====>>>>>查看已完成订单的状态改变', this.state);

    return(
      <View>
        {/* 订单单元头 */}
        <View style={styles.orderItemHeaderContainer}>
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
          <View style={styles.orderStatusContainer}>
            <Text style={styles.orderStatusText}>订单已完成</Text>
          </View>
        </View>
        {/* 订单商品列表 */}
        {
          itemArray.map((goodItem, i) => {
            const isUnCommented = goodItem['is_comments'] === 1
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
                      {
                        isUnCommented ? (
                          <TouchableOpacity
                            onPress={() => {
                              // 收集当前商品的数据内容，传递到评论添加页面
                              const item = {
                                order_id: order['order_id'],
                                sku_id: goodItem['sku_id'],
                                item_id: goodItem['item_id'],
                                item_name: goodItem['title'],
                                item_sku: goodItem['sku'],
                                item_img: goodItem['img'],
                              }
                              this.navigateToComment({ params: item })
                            }}
                            style={{
                              marginTop: 20,
                              backgroundColor: '#DDD',
                              borderRadius: 5,
                              paddingVertical: 3,
                            }}
                          >
                            <Text style={styles.addComment}>评价</Text>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            onPress={() => {
                              this.handleToggleModal(i)
                            }}
                            style={{
                              marginTop: 20,
                              backgroundColor: '#DDD',
                              borderRadius: 5,
                              paddingVertical: 3,
                            }}
                          >
                            <Text style={styles.addComment}>查看评价</Text>
                            <CommentModal
                              // 判断是否需要添加追评
                              isComments={goodItem['is_comments']}
                              item={goodItem}
                              orderId={order['order_id']}
                              navigation={this.props.navigation}
                              isModalVisible={currentModal.index === i && currentModal.isShow}
                              index={i}
                              onToggleModal={this.handleToggleModal}
                            />
                          </TouchableOpacity>
                        )
                      }
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
      </View>
    )
  }
}


class AchieveOrder extends React.Component {
  state = {
    routerPath: '/order?status=4',
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
    marginLeft: 10,
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
  },
  addComment: {
    textAlign: 'center',
    color: Color.primary,
    fontSize: 12,
  }
})

export default AchieveOrder;
