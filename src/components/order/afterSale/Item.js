/*
 * Created by Saul at 2018/07/11
 *
 * 商品信息
 *
 */

import React from 'react'
import { connect } from 'react-redux'
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
  Alert,
  Toast,
} from 'react-native'
import { Color, Font, Layout } from '../../../constants'

class Item extends React.Component {

  render() {
    const { item } = this.props
    return(
      <View
        style={{
          flexDirection: 'row',
          borderTopWidth: 10,
          borderBottomWidth: 0.5,
          borderColor: '#DDD',
          paddingVertical: 20,
          paddingHorizontal: 10,
        }}
      >
        <View
          style={{
            marginRight: 20,
          }}
        >
          <Image
            style={{
              height: 80,
              width: 80,
              borderRadius: 4,
            }}
            source={
              item.img === "" ?
                require('../../../assets/image/logo.png')
                : {
                  uri: item.img
                }
            }
          />
        </View>
        <View>
          <Text
            style={{
              color: Color.black,
            }}
          >
            {item.title}
          </Text>
          <Text
            style={{
              color: Color.grey,
              fontSize: 12,
            }}
          >
            价格: {item.price}  数量: {item.amount}
          </Text>
        </View>
      </View>
    )
  }
}

export default Item;
