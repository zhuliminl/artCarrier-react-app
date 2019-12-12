/*
 * Created by Saul at 2018/05/16
 *
 * 关于我们
 *
 */

import React from 'react';
import {
  View,
  Text,
  Image
} from 'react-native';

class AboutUsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: '关于艺艘航母'
  })
  render() {
    return(
      <View>
        <View
          style={{
            marginTop: 30,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Image
            style={{
              width: 150,
              height: 150,
              borderRadius: 5
            }}
            source={ require('../../../../assets/image/logo.png') }
          />
        </View>
        <View
          style={{
            marginTop: 20
          }}
        >
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center'
            }}>
            艺艘航母
          </Text>
          <Text></Text>
        </View>
      </View>
    )
  }
}

export default AboutUsScreen;

