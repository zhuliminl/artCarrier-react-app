
/*
 * Created by Saul at 2018/07/03
 *
 * 海报详情
 *
 */

import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView } from 'react-native'
import { Layout, Color } from '../../../../../constants'
import api from '../../../../../utils/api'
import Toast from '../../../../common/toast'
import { addToPlaylist, switchTrack } from '../../../../media/reducer/actions'
import HTML from 'react-native-render-html'

class PosterDetailScreen extends React.Component {
  static navigationOptions = () => {
    return {
      header: null
    }
  }

  state = {
    poster: null
  }

  componentDidMount = () => {
    this.fetchPoster()
  }

  fetchPoster = async () => {
    const { navigation } = this.props
    const posterId = navigation.getParam('courseId', 'noop')
    try {
      const response = await api.get(`/poster/${posterId}`)
      const posterData = response.data.data
      this.setState({
        poster: posterData
      })
    } catch(error) {
      Toast.show('请求错误')
    }
  }

  handleVideoPlay = () => {
    const { dispatch } = this.props
    const { poster } = this.state
    const title = poster['title']
    const videoName = poster['video_name']
    const videoURL = poster['video_url']
    const videoCoverURL = poster['img']

    dispatch(
      addToPlaylist({
        chapterTitle: title,
        courseTitle: videoName,
        speaker: '导师周杰伦',
        mediaURL: videoURL,
        mediaCoverURL: videoCoverURL
      })
    )

    const { navigation, trackList } = this.props
    const lastTrackIndex = trackList.length
    dispatch(
      switchTrack(lastTrackIndex)
    )
    navigation.navigate('媒体')
  }

  render() {
    const { poster } = this.state
    if(poster === null) return null
    const videoSupported = poster['video_name'] !== ""
    const detailRTF = poster['details']
    return(
      <ScrollView>
        <View>
          <Image
            source={{ uri: poster['img']}}
            style={{
              width: Layout.window.width,
              height: 200,
            }}
          />
        </View>
        <View
          style={{
            paddingVertical: 20,
          }}
        >
          <Text
            style={{
              color: '#333',
              fontSize: 23,
              textAlign: 'center'
            }}
          >
            {poster['title']}
          </Text>
        </View>

        {/* 价格
        <View
        >
          <Text
            style={{
              color: Color.primary
              fontSize: 14,
            }}
          >
            {poster['price']}

          </Text>
        </View>
            */}

        {
          videoSupported &&
            (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#F5F6F7',
                  height: 50,
                }}
                onPress={() => {
                  this.handleVideoPlay()
                }}
              >
                <Image
                  style={{
                    height: 30,
                    width: 30,
                  }}
                  source={ require('../../../../../assets/icon/media/paused_red.png') }
                />
                <Text>
                  播放简介
                </Text>
              </TouchableOpacity>
            )
        }
        {/* 海报详情 */}
        <View styles={{ flex: 1 }}>
          <View
            style={{
              marginTop: 20,
              borderLeftWidth: 3,
              borderColor: Color.primary
            }}
          >
            <Text>
              海报介绍
            </Text>
          </View>
          <HTML
            html={ detailRTF }
            imagesMaxWidth={ Layout.window.width }
            ignoredStyles={['display',]}
          />
        </View>


      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  const { mediaState } = state
  const { trackList } = mediaState
  return {
    trackList
  }
}

export default connect(mapStateToProps)(PosterDetailScreen)
