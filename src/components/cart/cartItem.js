/*
 * Created by Saul at 2018/06/01
 *
 * 购物车单元
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
} from 'react-native'
import { Color, Font } from '../../constants'
import CheckBox from '../common/checkBox'
import Toast from '../common/toast'
import Stepper from '../common/stepper'
import { toggleCheckInItem, updateItemAmount } from './reducer/actions'

class CartItem extends React.Component {
  handleToggleCheckInItem = () => {
    const {
      dispatch,
      supplier,
      itemId,
      skuId } = this.props

    dispatch(
      // 用供应商、商品Id、以及库存Id 来共同保证购物车单元项的唯一性。（稍微有点严格）
      toggleCheckInItem({
        supplier,
        itemId,
        skuId
      })
    )
  }

  handleUpdateItemAmount = (value) => {
    const { dispatch } = this.props
    const { supplier, itemId, skuId, amount } = this.props
    let item = {
      supplier,
      itemId,
      skuId,
      amount
    }
    dispatch(
      updateItemAmount(value, item)
    )
  }

  render() {
    return(
      <View style={ styles.container }>
        {/* 单选框 */}
        <View style={ styles.checkBoxContainer }>
          <CheckBox
            isChecked={ this.props.isChecked }
            onClick={() => {
              this.handleToggleCheckInItem()
              // Toast.show('切换选中商品')
            }}
          />
        </View>
        {/* 商品图片和商品信息 */}
        <View style={{
          borderTopWidth: this.props.index === 0 ? 0 : 1,
          // borderColor: '#F5F6F7',
          // Tag: newVersionColor
          borderColor: Color.homeBgLight,
          padding: 5,
          flexDirection: 'row',
          flex:1
        }}>
          <TouchableOpacity
            style={ styles.itemImageContainer }
            onPress={() => {
              Toast.show('去商品详情页', Toast.LONG)
            }}
          >
            <Image
              source={{uri: this.props.img}}
              style={ styles.itemImage }
            />
          </TouchableOpacity>
          {/* 商品详细信息 */}
          <View style={ styles.itemDetailConainer }>
            {/* 标题 */}
            <View style={ styles.itemTitleContainer }>
              <Text
                numberOfLines={2}
                ellipsizeMode={'tail'}
                style={ styles.titleText }
              >
                {this.props.title}
              </Text>
            </View>
            {/* 规格 */}
            <View style={ styles.descContainer }>
              <Text style={ styles.descText }>
                { this.props.desc }
              </Text>
            </View>
            {/* 价格和步进器 */}
            <View style={ styles.priceWithStepperContainer }>
              {/* 价格 */}
              <View style={ styles.priceTextContainer }>
                <Text style={ styles.priceText }>
                  ¥{ this.props.price }
                </Text>
              </View>
              {/* 步进器 */}
              <Stepper
                min={1}
                defaultValue={this.props.amount}
                onChange={(value) => {
                  Toast.show(`${value}`, Toast.LONG)
                  this.handleUpdateItemAmount(value)
                }}
              />
            </View>
          </View>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // backgroundColor: Color.white
    // Tag: newVersionColor
    backgroundColor: Color.homeBgDeep,
  },
  checkBoxContainer: {
    alignSelf: 'center',
    padding: 10
  },
  itemRightContainer: {
  },
  itemImageContainer: {
    // backgroundColor: '#EEE'
  },
  itemImage: {
    width: 90,
    height: 90
  },
  itemDetailConainer: {
    flex: 1,
    // backgroundColor: '#999',
    flexDirection: 'column',
    paddingLeft: 10,
    paddingTop: 5,
    paddingRight: 20,
  },
  titleText: {
    // color: Color.medium,
    // Tag: newVersionColor
    color: Color.white,
    fontSize: Font.tiny
  },
  descContainer: {
    marginTop: 4,
    borderRadius: 2,
    // backgroundColor: '#F5F6F7',
    // Tag: newVersionColor
    backgroundColor: Color.homeBgLight,
    padding: 4,
    alignSelf: 'flex-start'
  },
  descText: {
    color: Color.grey,
    fontSize: 10
  },
  priceWithStepperContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  priceTextContainer: {
    marginTop: 5,
    flex: 1
  },
  priceText: {
    fontSize: Font.small,
    color: Color.secondary
  }

})

export default connect(null)(CartItem)
