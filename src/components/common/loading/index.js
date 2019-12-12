/*
 * Created by Saul at 2018/06/21
 *
 * 正在加载
 *
 *
 */
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Alert
} from 'react-native';
import {
  Color, Font, Layout, Space
} from '../../../constants';


class Loading extends React.Component {

  render() {
    return(
      <View>
        <Text>
         正在加载
        </Text>
      </View>
    )
  }
}

export default Loading;
