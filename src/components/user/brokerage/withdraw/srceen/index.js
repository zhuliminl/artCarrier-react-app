/*
 * Created by Saul at 2018/05/15
 *
 * 提现屏幕
 *
 */

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

class WithdrawScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {

    return {
      title: '提现'
    }
  }

  render() {
    return (
      <View>
        <Text>
          提现
        </Text>
      </View>
    )
  }
}

export default WithdrawScreen;

