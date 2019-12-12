/*
 * Created by Saul at 2018/07/12
 *
 * 商品概要
 *
 */

import React from 'react';
import { connect } from 'react-redux'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert
} from 'react-native';
import {
  Font,
  Color,
  Space,
  Layout,
} from '../../../../constants';

class Summary extends React.Component {

  render() {
    // console.log('===========>> props of Summary', this.props)
    const { item = {} } = this.props
    return(
      <View
        style={{
          backgroundColor: Color.white,
          borderBottomWidth: 10,
          borderColor: '#DDD',
        }}
      >
        {/* 价格信息 */}
        <View
          style={{
            paddingHorizontal: 5,
          }}
        >
          <Text
            style={{
              paddingVertical: 7,
              color: Color.primary,
              fontWeight: 'bold',
              fontSize: 30,
            }}
          >
            ￥{item.currentPrice}
          </Text>
          <Text
            style={{
              textDecorationLine: 'line-through',
              marginLeft: 5,
              color: Color.grey,
            }}
          >
            价格￥{item.oldPrice}
          </Text>
        </View>
        {/* 商品名称 */}
        <View
          style={{
            paddingHorizontal: 10,
          }}
        >
          <Text
            style={{
              color: Color.black,
              fontWeight: 'bold',
              fontSize: 15,
            }}
          >
            {item.title}
          </Text>
        </View>
        {/* 总销量、总库存、点赞数 */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}
        >
          {
            this.props.isShowSales &&
              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                <Text style={{marginRight: 10,}}>
                  总销量
                </Text>
                <Text>
                  {item.baseSale}
                </Text>
              </View>
          }
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <Text style={{marginRight: 10,}}>
              总库存
            </Text>
            <Text>
              {item.sumStock}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <Text style={{marginRight: 10,}}>
              点赞数
            </Text>
            <Text>
              {item.baseLike}
            </Text>
          </View>
        </View>

      </View>
    )
  }
}

export default Summary;
