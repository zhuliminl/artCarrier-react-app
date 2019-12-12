/*
 * Created by Saul at 2018/07/11
 *
 * 物流信息输入
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
  TextInput,
  Easing,
  AlertIOS,
  Platform,
  Text,
  Alert,
  Toast,
} from 'react-native'
import { Color, Font, Layout } from '../../../constants'
import Address from './Address'


class LogisticInfo extends React.Component {

  render() {
    return(
      <View
        style={{
          width: Layout.window.width,
          paddingTop: 10,
          paddingLeft: 10,
          marginTop: 10,
          borderTopWidth: 10,
          borderColor: '#DDD',
        }}
      >
        <Text
          style={{
            marginLeft: 10,
            color: Color.black,
          }}
        >
          物流信息输入
        </Text>
        {/* 物流快递单号 */}
        <View
          style={{
            borderBottomWidth: 0.5,
            borderColor: '#DDD',
            width: Layout.window.width,
            paddingVertical: 5,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              flex: 1,
              paddingLeft: 10,
            }}
          >
            物流快递单号
          </Text>
          <TextInput
            style={{
              width: 100,
              paddingRight: 10,
            }}
            onChangeText={(text) => {
              console.log('=====>>>>>物流快递单号', );
            }}
            // textAlignVertical={'top'}
            placeholderTextColor='#a1a1a1'
            placeholder={'订单编号'}
          >
          </TextInput>
        </View>
        {/* 物流公司名称 */}
        <View
          style={{
            borderBottomWidth: 0.5,
            borderColor: '#DDD',
            width: Layout.window.width,
            paddingVertical: 5,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              flex: 1,
              paddingLeft: 10,
            }}
          >
            物流公司名称
          </Text>
          <TextInput
            style={{
              width: 100,
              paddingRight: 10,
            }}
            onChangeText={(text) => {
              console.log('=====>>>>>物流公司名称', );
            }}
            // textAlignVertical={'top'}
            placeholderTextColor='#a1a1a1'
            placeholder={'公司名称'}
          >
          </TextInput>
        </View>
        {/* 退换货说明 */}
        <View
          style={{
            paddingHorizontal: 10,
          }}
        >
          <Text
            style={{
              color: Color.black,
              paddingVertical: 10,
            }}
          >
            退换货说明
          </Text>
          <TextInput
            style={{
              paddingHorizontal: 10,
              backgroundColor: '#DDD',
              borderRadius: 5,
              height: 100,
            }}
            onChangeText={(text) => {
              console.log('=====>>>>>退换货说明', );
            }}
            editable={true}
            maxLength={500}
            numberOfLines={4}
            textAlignVertical={'top'}
            underlineColorAndroid='transparent'
            placeholderTextColor='#a1a1a1'
            placeholder={'请填写说明'}
          >
          </TextInput>
        </View>
        {/* 退换货地址id, 注意是 ID！！！ */}
        <Address
          navigation={this.props.navigation}
        />

        {/* 换货是的 skuid ...... */}
      </View>
    )
  }
}

export default LogisticInfo;
