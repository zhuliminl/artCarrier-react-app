/*
 * Created by Saul at 2018/06/02
 *
 * 购物车单元顶栏，包括供应商标志以及可选的领券入口
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
import { Layout, Color, Font } from '../../constants'
import Toast from '../common/toast'
import CheckBox from '../common/checkBox'
import { toggleAllCheckedInShop } from './reducer/actions'

class CartItemHeader extends React.Component {

  // 反转当前供应商下的所有上屏的选中状态
  handleToggleAllCheckedInShop = () => {
    const { dispatch, supplier } = this.props
    dispatch(
      toggleAllCheckedInShop(supplier)
    )
  }

  render() {
    // console.log('props in CartItemHeader', this.props)
    return(
      <View style={ styles.container }>
        <CheckBox
          isChecked={this.props.isChecked}
          onClick={() => {
            this.handleToggleAllCheckedInShop()
            // Toast.show('全选本分销商的商品', Toast.LONG)
          }}
        />
        <TouchableOpacity
          style={ styles.headerLeftContainer }
          onPress={() => {
            Toast.show('去分销商页面', Toast.LONG)
          }}
        >
          <Text
            style={{
              color: Color.white,
            }}
          >
            { this.props.supplier }
          </Text>
        </TouchableOpacity>
        {/* 领券 */}
        <TouchableOpacity style={ styles.headerRightContainer }>
          <Text style={ styles.receiveCouponText }>
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // 用边框代替分隔组件
    borderTopWidth: 10,
    borderBottomWidth: 1,
    // borderColor: '#F5F6F7',
    // Tag: newVersionColor
    borderColor: Color.homeBgLight,
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
    // backgroundColor: Color.white
    // Tag: newVersionColor
    backgroundColor: Color.homeBgDeep,
  },
  headerLeftContainer: {
    marginLeft: 10,
    flex: 1
  },
  headerRightContainer: {
    // backgroundColor: 'red'
  },
  receiveCouponText: {
    // color: Color.medium,
    // Tag: newVersionColor
    color: Color.white,
    fontSize: Font.tiny
  }
})


export default connect(null)(CartItemHeader);
