/*
 * Created by Saul at 2018/05/08
 *
 * 消息
 *
 */

import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import MessageCenter from '../MessageCenter'
import { Font, Color } from '../../../../constants';


class MessageScreen extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;
    // console.log('Message Page navigation', navigation)
    // console.log('Message Page navigationOptions', navigationOptions)
    return {
      // 以后可能会提升到顶级导航去定义统一样式
      title: '消息中心',
      headerTitleStyle: {
        fontSize: Font.small,
        color: Color.medium
      }
    }
  };
  render() {
    return(
      <MessageCenter />
    )
  }
}

const styles = StyleSheet.create({

})

export default MessageScreen;
