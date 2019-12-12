/*
 * Created by Saul at 2018/06/06
 *
 * 播放面板的顶部栏
 * 包括导航、分享、更多操作的入口
 *
 */

import React from 'react'
import { connect } from 'react-redux'
import {
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Text,
  Animated,
  Easing,
  Platform
} from 'react-native'
import { Color, Layout } from '../../constants'


class PlayerHeader extends React.Component {

  render() {
    return(
      <View style={ styles.container }>
        {/* 返回按钮 */}
        <View style={ styles.backContainer }>
          <TouchableOpacity
            style={ styles.backIconContainer }
            onPress={() => {
              this.props.navigation.goBack()
            }}
          >
            <Image
              style={ styles.iconImage }
              source={require('../../assets/icon/back.png')}
            />
          </TouchableOpacity>
        </View>
        {/* 分享按钮 */}
        <TouchableOpacity
          style={ styles.iconContainer }
          onPress={() => {
            const { onShareToWechat, currentTrack } = this.props
            onShareToWechat({
              type: 'text',
              title: currentTrack.courseTitle,
              description: currentTrack.chapterTitle
            })

          }}
        >
          <Image
            style={ styles.iconImage }
            source={require('../../assets/icon/share.png')}
          />
        </TouchableOpacity>
        {/* 更多 */}
        <TouchableOpacity style={ styles.iconContainer }>
          <Image
            style={ styles.iconImage }
            source={require('../../assets/icon/more.png')}
          />
        </TouchableOpacity>
      </View>
    )
  }
}

const iconSize = 35
const styles = StyleSheet.create({
  container: {
    // paddingTop: 30,
    paddingTop: Platform.OS === 'ios' ? 30 : 10,
    backgroundColor: Color.white,
    height: Platform.OS == 'ios' ? 80 : 60,
    flexDirection: 'row',
    shadowOpacity: 0.35,
    shadowRadius: 5,
    shadowColor: '#AAA',
    shadowOffset: { height: 10, width: 0 },
    // TODO: 暂时不知道为什么安卓不显示阴影
    elevation: 5,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: Color.grey,
    width: iconSize,
    height: iconSize,
    borderRadius: iconSize/2,
  },
  iconImage: {
    alignItems: 'center',
    width: 25,
    height: 25
  },
  backContainer: {
    flex: 1,
    opacity: 0.8,
  },
  backIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#999',
    width: iconSize,
    height: iconSize,
    borderRadius: iconSize/2,
  }
})

export default connect(null)(PlayerHeader)
