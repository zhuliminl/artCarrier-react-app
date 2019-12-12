/*
 * Created by Saul at 2018/07/05
 *
 * 商品好评等级
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

class CommentLevel extends React.Component {

  render() {
    return(
      <View
        style={{
          marginLeft: -20,
          marginTop: 10,
          paddingVertical: 5,
          paddingHorizontal: 10,
          justifyContent: 'space-around',
          flexDirection: 'row',
          borderBottomWidth: 0.5,
          borderColor: '#DDD'
        }}
      >
        <TouchableOpacity
          onPress={() => {
            this.props.onOrderPaise(1)
          }}
        >
          {/* 好评 */}
          <Image
            style={{
              height: 30,
              width: 30,
            }}
            source={
              this.props.orderPraiseLevel === 1 ?
                  require('../../../assets/icon/order/appraise_level_1_red.png')
                : require('../../../assets/icon/order/appraise_level_1_grey.png')
            }
          />
          <Text
            style={{
              color: this.props.orderPraiseLevel === 1 ?
                  Color.primary
                : Color.grey
            }}
          >
            好评
          </Text>

        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.props.onOrderPaise(2)
          }}
        >
          {/* 中评 */}
          <Image
            style={{
              height: 30,
              width: 30,
            }}
            source={
              this.props.orderPraiseLevel === 2 ?
                  require('../../../assets/icon/order/appraise_level_2_red.png')
                : require('../../../assets/icon/order/appraise_level_2_grey.png')
            }
           />
          <Text
            style={{
              color: this.props.orderPraiseLevel === 2 ?
                  Color.primary
                : Color.grey
            }}
          >
            中评
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            this.props.onOrderPaise(3)
          }}
        >
          {/* 差评 */}
          <Image
            style={{
              height: 30,
              width: 30,
            }}
            source={
              this.props.orderPraiseLevel === 3 ?
                  require('../../../assets/icon/order/appraise_level_3_red.png')
                : require('../../../assets/icon/order/appraise_level_3_grey.png')
            }
           />
          <Text
            style={{
              color: this.props.orderPraiseLevel === 3 ?
                  Color.primary
                : Color.grey
            }}
          >
            差评
          </Text>
        </TouchableOpacity>

      </View>
    )
  }
}

export default CommentLevel;
