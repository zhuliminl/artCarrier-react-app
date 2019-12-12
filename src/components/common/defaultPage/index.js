/*
 * Created by Saul at 2018/05/09
 *
 * 缺省页
 *
 */

import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import {
  Color,
  GlobalStyle,
  Layout
} from '../../../constants';

export default ({ message, onTryAgain, canTryAgain }) => (
  <View style={ styles.container } >
    {/* 配图 */}
    <View>
      <Image
        style={ styles.illustration }
        source={ require('../../../assets/image/default/default.png') }
      />
    </View>
    {/* 传入的消息提示 */}
    {/*
    <View>
      <Text style={ styles.messageTest } >
        { message ? message : '空空如也' }
      </Text>
    </View>
    */}
    <TouchableOpacity
      onPress={() => { canTryAgain && onTryAgain() }}
    >
      <Text style={ styles.messageTest } >
        { message ? message : '空空如也' }
      </Text>
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: Color.homeBgDark,
    backgroundColor: Color.white,
  },
  illustration: {
    resizeMode: 'contain',
    width: 200,
  },
  messageTest: {
    color: Color.medium
  }
})
