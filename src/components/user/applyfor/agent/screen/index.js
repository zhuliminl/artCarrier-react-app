/*
 * Created by Saul at 2018/05/16
 *
 * 申请成为代理商
 *
 */

import React from 'react';
import { View, Text } from 'react-native';

class ApplyForAgentScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: '申请成为代理商'
  })
  render() {
    return(
      <View>
        <Text>
          申请成为代理商
        </Text>
      </View>
    )
  }
}

export default ApplyForAgentScreen;

