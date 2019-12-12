/*
 * Created by Saul at 2018/06/13
 *
 * 订单章节列表信息
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
import { Color, Layout, Font } from '../../../constants'

class OrderSection extends React.Component {

  render() {
    const { itemList, supplierName, supplierLogo } = this.props
    return(
      <View>
        {/* 供应商信息 */}
        <View style={styles.orderHeaderContainer}>
          {/*
          <Image
            source={{uri: supplierLogo}}
            style={{
              height: 30,
              width: 30
            }}
          />
            */}
          <Text style={styles.orderHeaderText}>
            { supplierName }
          </Text>
        </View>
        {
          itemList.map((goodItem, i) => {
            return (
              <View
                key={i}
                style={styles.itemContainer}
              >
                {/* 商品图片 */}
                <View style={styles.itemImageContainer}>
                  <Image
                    source={{ uri: goodItem['img'].split(',')[0] }}
                    style={styles.itemImage}
                  />
                </View>
                {/* 商品信息 */}
                <View style={styles.itemInfoContainer}>
                  <Text style={styles.itemTitleText}>
                    {goodItem['title']}
                  </Text>
                  <Text style={styles.descText}>
                    {goodItem['sku']}
                  </Text>
                </View>
                {/* 商品价格和数量 */}
                <View style={{flexDirection: 'row', padding: 10}}>
                  <Text style={styles.priceText}>
                    ¥{goodItem['current_price']}
                  </Text>
                  <Text style={styles.amountText}>
                    x{goodItem['amount']}
                  </Text>
                </View>
              </View>
            )
          })
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  orderHeaderContainer: {
    backgroundColor: Color.white,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    flexDirection: 'row'
  },
  orderHeaderText: {
    marginLeft: 10,
    fontSize: Font.small,
    color: Color.black
  },
  itemContainer: {
    borderBottomWidth: 5,
    borderColor: Color.white,
    paddingHorizontal: 10,
    backgroundColor: '#f5F6F7',
    flexDirection: 'row'
  },
  itemImageContainer: {
    // padding: 5,
  },
  itemImage: {
    borderRadius: 4,
    width: 80,
    height: 80
  },
  itemInfoContainer: {
    flex: 1,
    paddingHorizontal: 10,
    // backgroundColor: 'red'
  },
  itemTitleText: {
    paddingVertical: 5,
    color: Color.black,
    fontSize: 14
  },
  descText: {
    paddingBottom: 5,
    color: Color.grey,
    fontSize: Font.tiny
  },
  priceText: {
    // flex: 1,
    color: Color.medium,
    fontSize: Font.tiny
  },
  amountText: {
    color: Color.grey,
    fontSize: Font.tiny
  },
})


export default OrderSection;
