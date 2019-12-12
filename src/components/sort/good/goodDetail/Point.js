/*
 * Created by Saul at 2018/07/12
 *
 * 积分相关规则
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

class Point extends React.Component {

  render() {
    const { templateBase } = this.props
    return(
      <View
        style={{
          borderColor: '#DDD',
          borderTopWidth: 0.5,
          paddingVertical: 10,
        }}
      >
        {/* 购买所需积分 */}
        {
          templateBase.need_points === 0 ? null : (
            <View
              style={{
                flexDirection: 'row',
              }}
            >
              <Text
                style={{
                  flex: 1,
                }}
              >
                购买所需积分
              </Text>
              <Text style={{marginRight: 10, color: Color.secondary}}>
                {templateBase.need_points}
              </Text>
            </View>
          )
        }
        {/* 积分抵现 */}
        {
          templateBase.max_points === "0.00" ? null : (
            <View
              style={{
                paddingVertical: 10,
                flexDirection: 'row',
              }}
            >
              <Text
                style={{
                  flex: 1,
                }}
              >
                积分抵现最高百分比
              </Text>
              <Text style={{marginRight: 10, color: Color.secondary}}>
                {templateBase.max_points} %
              </Text>
            </View>
          )
        }
      </View>
    )
  }
}

export default Point;
