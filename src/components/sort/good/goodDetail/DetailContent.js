/*
 * Created by Saul at 2018/07/10
 *
 * 商品详情富文本内容
 *
 */

import React from 'react';
import { connect } from 'react-redux'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert
} from 'react-native';
import {
  Font,
  Color,
  Space,
  Layout,
} from '../../../../constants';
import HTML from 'react-native-render-html'; // 展示HTML内容



class DetailContent extends React.Component {

  render() {
    return(
      <HTML
        html={this.props.data.detailRTF}
        imagesMaxWidth={Dimensions.get('window').width}
        ignoredStyles={['display',]}
      />
    )
  }
}

export default DetailContent;
