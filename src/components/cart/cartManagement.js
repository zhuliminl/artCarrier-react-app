/*
 * Created by Saul at 2018/06/05
 *
 * 购物车的管理
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
  Alert
} from 'react-native'
import { Color, Font } from '../../constants'
import Toast from '../common/toast'
import { deleteFromCart } from './reducer/actions'

class CartManagement extends React.Component {
  static defaultProps = {
    isShowCartManagement: false,
  }

  handleDeleteFromCart = () => {
    // 删除购物车
    const { dispatch, isCheckedInAll, cartData } = this.props
    if(cartData.length === 0) {
      Toast.show('购物车为空')
      return
    }

    // 当前全选所有订单，则需要进行二次确认
    if(isCheckedInAll) {
      Alert.alert(
      '警告',
      '确定要删除全部商品？',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => {
            dispatch(
              deleteFromCart()
            )
          }},
        ],
        { cancelable: false }
      )
      return
    }

    dispatch(
      deleteFromCart()
    )
  }

  render() {
    const {
      isShowCartManagement,
    } = this.props

    if(!isShowCartManagement) {
      return null
    }
    return(
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.deleteButtonContainer}
          onPress={() => {
            this.handleDeleteFromCart()
          }}
        >
          <Text style={styles.deleteButtonText}>
            删除
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: Color.white,
    // Tag: newVersionColor
    backgroundColor: Color.homeBgDeep,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  deleteButtonContainer: {
    marginRight: 20,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: 'red',
    paddingVertical: 5,
    paddingHorizontal:20,
  },
  deleteButtonText: {
    fontSize: Font.small,
    color: 'red'
  }

})

const mapStateToProps = state => {
  const { cartState } = state
  return {
    isCheckedInAll: cartState.isCheckedInAll,
    cartData: cartState.cart
  }
}

export default connect(mapStateToProps)(CartManagement)
