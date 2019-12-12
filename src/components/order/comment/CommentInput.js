/*
 * Created by Saul at 2018/07/05
 *
 * 评价输入栏目
 * 包括音频和视频
 *
 */

import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
  TextInput
} from 'react-native'
import { Color, Layout, Font } from '../../../constants'
import Toast from '../../common/toast'
import ImageUpload from '../../common/imageUpload'

class CommentInput extends React.Component {

  render() {
    return(
      <View>
        {/* 文字输入 */}
        <View
          style={{
            paddingHorizontal: 10
          }}
        >
          <TextInput
            multiline
            numberOfLines={4}
            onChangeText={(text) => {
              this.props.onChangeText(text)
            }}
            underlineColorAndroid='transparent'
            placeholderTextColor='#a1a1a1'
            placeholder="宝贝满足你的期待么？说说它的优点和美中不足的地方吧 "
          >
          </TextInput>
        </View>
        {/* 图片选取 */}
        <TouchableOpacity
          onPress={() => {
            console.log('=====>>>>>晒图', );
          }}
        >
          <ImageUpload
            onBase64Upload={this.props.onBase64Upload}
          />
        </TouchableOpacity>
      </View>
    )
  }
}

export default CommentInput;
