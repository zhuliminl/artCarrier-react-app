/*
 * Created by Saul at 2018/07/09
 *
 * 商品展示
 *
 */

import React from 'react'
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
import { Color, Layout, Font } from '../../../constants'
import Toast from '../../common/toast'
import CheckBox from '../../common/checkBox'

class ItemDisplay extends React.Component {

  render() {
    const { item } = this.props
    if(item === null) return null
    console.log('=====>>>>>商品展示',item );
    return(
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 20,
          paddingHorizontal: 10,
        }}
      >
        <View>
          <Image
            style={{
              borderRadius: 4,
              height: 80,
              width: 80,
            }}
            source={{ uri: item['item_img'].split(',')[0] }}
          />
        </View>
        <View
          style={{
            flex: 1,
            marginHorizontal: 10,
          }}
        >
          {/* 商品名称 */}
          <Text
            style={{
              color: Color.black,
              fontSize: 15,
              paddingBottom: 5,
            }}
          >
            {item['item_name']}
          </Text>
          {/* 商品描述 */}
          <Text
            style={{
              color: Color.grey,
              fontSize: 12,
              paddingBottom: 5,
            }}
          >
            {item['item_sku']}
          </Text>
        </View>

      </View>
    )
  }
}

export default ItemDisplay;
