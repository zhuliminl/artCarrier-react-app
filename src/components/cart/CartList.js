/*
 * Created by Saul at 2018/06/01
 *
 * 购物车列表
 *
 */

import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SectionList
} from 'react-native'
import DefaultPage from '../common/defaultPage'
import { Layout, Color, Font } from '../../constants'
// import data from './__test__'
import CartItemHeader from './cartItemHeader'
import CartItem from './cartItem'



class CartList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const { cartData } = this.props
    if(cartData.length === 0) {
      return(
        <View
          style={{
            flex: 1
          }}
        >
          <DefaultPage message={'购物车空空的哦，快去购买吧'}/>
        </View>
      )
    }
    return(
      <View style={ styles.cartListContainer }>
        <SectionList
          renderItem={({ item, index, section }) =>
              <CartItem
                index  = { index }
                isChecked={ item.isChecked }
                supplier = { item.supplier }
                title  = { item.title }
                img    = { item.img }
                desc   = { item.desc }
                price  = { item.price }
                amount = { item.amount }
                itemId = { item.itemId }
                skuId  = { item.skuId }
              />
          }
          // 从 section 中取顶部栏的数据
          renderSectionHeader={({ section: { supplier, isChecked }}) =>
              <CartItemHeader
                isChecked={ isChecked }
                supplier={ supplier }
              />
          }
          // 测试
          sections={ this.props.cartData }
          keyExtractor={(item, index) => item + index}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cartListContainer: {
    // height: 30,
    // paddingHorizontal: 10,
    // borderRadius: 10,

    flex: 1,
    // height: Layout.window.height,
    backgroundColor: '#F5F6F7',
    // Tag: newVersionColor
    backgroundColor: Color.homeBgDark,
  }
})

const mapStateToProps = (state) => {
  const { cartState } = state
  return {
    cartData: cartState.cart
  }
}

export default connect(mapStateToProps)(CartList)
