/*
 * Created by Saul at 2018/06/14
 *
 * 我正在学习的课程单元
 *
 */

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import {
  Color, Font, Layout, Space
} from '../../../constants';

class ListItem extends React.Component {
  render() {
    return (
      <View>
        <Text>
          我的课程单元
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
   container: {
    padding: 8,
    flexDirection: 'row',
    backgroundColor: Color.white,
    marginBottom: 1
  },
})

export default ListItem

