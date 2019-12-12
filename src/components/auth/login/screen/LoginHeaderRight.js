/*
 * Created by jemo on 2018-3-28.
 * 登录右上角按钮
 */

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TouchableItem from '../../../../utils/TouchableItem';

class LoginHeaderRight extends Component {
  render() {
    //console.log('this.props: ', this.props);
    let { navigation } = this.props;
    return(
      <TouchableItem
        borderless
        style={styles.container}
        onPress={() => requestAnimationFrame(() => {
          navigation.navigate('Register')
        })}>
        <Text
          style={styles.text} >
          注册
        </Text>
      </TouchableItem>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 56,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginHeaderRight;
