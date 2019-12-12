/*
 * Created by Saul at 2018/07/11
 *
 * 问题描述
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


class ProblemDesc extends React.Component {

  render() {
    return(
      <View
        style={{
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            color: Color.black,
            paddingVertical: 10,
          }}
        >
          问题描述
        </Text>
        <TextInput
          style={{
            paddingHorizontal: 10,
            backgroundColor: '#DDD',
            borderRadius: 5,
            height: 100,
          }}
          onChangeText={(text) => {
            const { onProblemInput } = this.props
            onProblemInput(text)
          }}
          editable={true}
          maxLength={500}
          numberOfLines={4}
          textAlignVertical={'top'}
          underlineColorAndroid='transparent'
          placeholderTextColor='#a1a1a1'
          placeholder={'请您在此描述问题'}
        >
        </TextInput>
      </View>
    )
  }
}

export default ProblemDesc;

