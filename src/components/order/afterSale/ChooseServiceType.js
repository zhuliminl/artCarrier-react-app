/*
 * Created by Saul at 2018/07/11
 *
 * 选择服务类型
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
  Easing,
  AlertIOS,
  Platform,
  Text,
  Alert,
  Toast,
} from 'react-native'
import { Color, Font, Layout } from '../../../constants'

class ChooseServiceType extends React.Component {
  state = {
    activeIndex: 0,
  }

  render() {
    return(
      <View
        style={{
          paddingVertical: 10,
          paddingLeft: 10,
        }}
      >
        <View
          style={{
            paddingVertical: 10,
          }}
        >
          <Text
            style={{
              color: Color.black,
            }}
          >
            服务类型
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          {
            this.props.serviceTypes.map((serviceType, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    const { onServiceTypeChoose } = this.props
                    onServiceTypeChoose(i)
                    this.setState({
                      activeIndex: i
                    })
                  }}
                  style={{
                    marginRight: 20,
                    paddingVertical: 5,
                    paddingHorizontal: 20,
                    borderWidth: 0.5,
                    borderColor: this.state.activeIndex === i ? Color.primary : '#999',
                  }}
                >
                  <Text
                    style={{
                      color: this.state.activeIndex === i ? Color.primary : '#999',
                    }}
                  >
                    {serviceType}
                  </Text>
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>
    )
  }
}

export default ChooseServiceType;
