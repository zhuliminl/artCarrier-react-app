/*
 * Created by Saul at 2018/05/22
 *
 * 列表单元
 *
 */

import React from 'react';
import { connect } from 'react-redux'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import {
  Color, Font, Layout, Space
} from '../../../../constants';
import { withNavigation } from 'react-navigation'

import { addToCart } from '../../../cart/reducer/actions'

class ListItem extends React.Component {

  // 暂时将 立即购买 当作 加入购物车 的入口
  // 后期会取消这个入口。购买动作只可能在详情页发出
  handleAddToCart = () => {
    const { dispatch, good } = this.props

    const goodName = good['name'] || '';
    const goodId = good['item_id'] || '';
    const currentPrice = good['current_price'] || '';

    // 派发添加到购物车动作，需要供应商、商品ID、商品名称、(商品规格)、价格
    dispatch(addToCart({
      // 暂时手动添加供应商ID
      supplier: '朱黎明',
      skuId: '规格',
      desc: '默认',
      itemId: goodId,
      itemTitle: goodName,
      price: currentPrice,
      amount: 1
    }))
  }

  render() {

    const { good, index } = this.props;
    const baseSale = good['base_sale'] || 0;
    // const goodTitle = good['title'] || '';
    const goodName = good['name'] || '';
    const goodId = good['item_id'] || '';
    // 后台传过来的图片地址数据为多个 URL 以逗号隔开拼接而成的字符串格式，前台只需要取其一使用即可
    const goodImageURLData = good['main_images'] || '';
    const goodImageURL = goodImageURLData.split(',')[0];

    const currentPrice = good['current_price'] || '';
    const oldPrice = good['old_price'] || '';

    const compositionStyle = this.props.compositionStyle || 'row';

    // console.log('list item props', this.props)

    // 单列布局
    if(compositionStyle === 'row') {
      return (
        <TouchableOpacity
          style={ styles.rowContainer }
          onPress={() => {
            this.props.navigation.navigate('GoodDetail', {
              goodId,
              goodName,
              good
            })
          }}
        >
          {/* 右边商品图片 */}
          <View style={ styles.rowImageContainer }>
            <Image
              style={ styles.rowImage }
              source={
                goodImageURL === ""
                  ? require('../../../../assets/image/logo.png')
                  : {
                    uri: goodImageURL
                  }
							}
            />
          </View>
          {/* 左边商品信息 */}
          <View style={ styles.rowInfoContainer }>
            <Text style={ styles.rowGoodName }>{ goodName }</Text>
          {/* 价格和购买按钮 */}
            <View style={ styles.rowGoodPriceWithButtonContainer }>
              <View style={ styles.rowGoodPriceTextContainer }>
                <View style={ styles.rowCurrentPriceContainer }>
                  <Text style={ styles.rowCurrentPriceText }>¥{ currentPrice }</Text>
                </View>
                <View style={ styles.rowOldPriceContainer }>
                  <Text style={ styles.rowOldPriceText }>¥{ oldPrice }</Text>
                </View>
              </View>

              {/*
              购买按钮
              <TouchableWithoutFeedback style={ styles.rowButtonPurchaseContainer }>
                <TouchableOpacity
                  onPress={() => {
                    // console.log('加入购物车')
                    this.handleAddToCart()
                  }}>
                  <Text style={ styles.rowButtonnPurchaseText }>立即购买</Text>
                </TouchableOpacity>
              </TouchableWithoutFeedback>
                  */}

            </View>
          </View>
        </TouchableOpacity>
      )
    }

    return (
      <View>
        <Text>
          横栏
        </Text>
      </View>
    )

    return(
      <TouchableOpacity
          style={{
            // 去掉右栏的右边距
            // marginRight: index % 2 === 0 ? 10 : 0,
            // marginBottom: 8,
            // backgroundColor: Color.white
            backgroundColor: '#999',
            width: 200

          }}
          onPress={() => {
            console.log('goto detail page')
          }}
      >
        {/* 图片 */}
        <View style={ styles.columnImageContainer }>
          <Image
            source={{ uri: goodImageURL }}
            style={ styles.columnImage }
          />
        </View>
        <View style={ styles.columnGoodNameContainer }>
          <Text
            ellipsizeMode={'tail'}
            numberOfLines={2}
            style={ styles.columnGoodNameText }>
            { goodName }
          </Text>
        </View>
        <View style={ styles.columnPriceTextContainer }>
          <View style={ styles.columnCurrentPriceContainer }>
            <Text style={ styles.columnCurrentPriceText }>¥{ currentPrice }</Text>
          </View>
          <Text style={ styles.columnOldPriceText }>¥{ oldPrice }</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  // 单列排版样式
  rowContainer: {
    padding: 8,
    flexDirection: 'row',
    // backgroundColor: Color.white,
    // Tag: newVersionColor
    backgroundColor: Color.homeBgDeep,
    marginBottom: 1

  },
  rowImageContainer: {
  },
  rowImage: {
    width: 100,
    height: 100
  },
  rowInfoContainer: {
    paddingLeft: Space.small,
    paddingRight: Space.small,
    flex: 1,
    flexDirection: 'column',
  },
  rowGoodName: {
    flex: 1,
    color: Color.white,
  },
  rowGoodPriceWithButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  rowGoodPriceTextContainer: {
    flexDirection: 'row',
    flex: 1
  },
  rowCurrentPriceContainer: {
    paddingRight: 10,
  },
  rowCurrentPriceText: {
    color: Color.primary
  },
  rowOldPriceText: {
    // textAlign: 'left',
    color: Color.grey,
    textDecorationLine: 'line-through'
  },
  rowButtonPurchaseContainer: {
    flex: 1
  },
  rowButtonnPurchaseText: {
    fontSize: Font.small,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: Space.small,
    paddingRight: Space.small,
    color: Color.white,
    backgroundColor: Color.primary
  },

  // 双列排版样式
  columnImageContainer: {
    padding: 0
  },
  columnImage: {
    width: Layout.window.width / 2 - 4,
    height: Layout.window.width / 2 - 4
  },
  columnGoodNameContainer: {
    width: Layout.window.width / 2 - 20
  },
  columnGoodNameText: {
    padding: Space.small,
    color: Color.white,
  },
  columnPriceTextContainer: {
    // justifyContent: 'center',
    alignItems: 'center',
    padding: Space.small,
    flexDirection: 'row'
  },
  columnCurrentPriceContainer: {
    paddingRight: 10
  },
  columnCurrentPriceText: {
    fontSize: Font.small,
    color: Color.primary

  },
  columnOldPriceText: {
    color: Color.grey,
    textDecorationLine: 'line-through'
  }
})

const ListItemConnected = connect(null)(ListItem)

// export default withNavigation(ListItem)
export default withNavigation(ListItemConnected)
