/*
 * Created by Saul at 2018/05/14
 *
 * 我的积分
 *
 */

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PointRemain from '../PointRemain';
import RecordList from '../RecordList';


class PointScreen extends React.Component {

  render() {
    console.log('PointScreen props', this.props)
    const navigation = this.props.navigation;
    return(
      <View>
        <PointRemain />
        <RecordList />
      </View>
    )
  }
}

export default PointScreen;
