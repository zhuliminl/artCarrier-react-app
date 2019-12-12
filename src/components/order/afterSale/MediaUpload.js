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
import ImageUpload from '../../common/imageUpload'



class MediaUpload extends React.Component {

  render() {

    return (
      <View>
        <ImageUpload
        />
      </View>
    )
  }
}

export default MediaUpload;
