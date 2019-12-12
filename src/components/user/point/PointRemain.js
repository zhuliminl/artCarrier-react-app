/*
 * Created by Saul at 2018/05/14
 *
 * 剩余积分
 *
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { Layout, Color, Font } from '../../../constants';
import { pointData } from './__test__';
import { Toast } from 'antd-mobile';

const bgPointURL = require('../../../assets/image/bg_point.png');

class PointRemain extends React.Component {

  render() {
    return(
      <ImageBackground
        style={ styles.container }
        source={ bgPointURL }
      >
        <View style={ styles.pointRemainTextContainer }>
          <Text style={ styles.pointRemainTextSmall }>
            剩余
          <Text style={ styles.pointRemainTextLarge }>
            { pointData.pointRemain }
          </Text>
            分
          </Text>
        </View>

        <TouchableOpacity
          // 测试一下弹窗
          onPress={() => {
            Toast.loading('test toast')

            console.log('point withdraw button is pressed')
          }}
        >
          <Text style={ styles.buttonWithdraw }>
            全部提现
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 224,
    width: Layout.width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointRemainTextContainer: {
    flexDirection: 'row',
  },
  pointRemainTextLarge: {
    fontSize: 50,
    fontWeight: 'bold',
    color: Color.white
  },
  pointRemainTextSmall: {
    fontSize: Font.small,
    color: Color.white
  },
  buttonWithdraw: {
    color: Color.white,
    fontSize: Font.medium,
    fontWeight: 'bold',
    lineHeight: 100,
    position: 'relative',
    top: 25
  }
})

export default PointRemain;
