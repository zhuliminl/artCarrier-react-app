/*
 * Created by Saul at 2018/07/03
 *
 * 培训详情
 *
 */

import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView } from 'react-native'
import { Layout, Color } from '../../../../../constants'
import api from '../../../../../utils/api'
import Toast from '../../../../common/toast'
import HTML from 'react-native-render-html'
import { addToPlaylist, switchTrack } from '../../../../media/reducer/actions'

class TrainDetailScreen extends React.Component {
  static navigationOptions = () => {
    return {
      header: null
    }
  }

  state = {
    train: null
  }

  componentDidMount = () => {
    this.fetchTrain()
  }

  fetchTrain = async () => {
    const { navigation } = this.props
    const trainId = navigation.getParam('courseId', 'noop')
    try {
      const response = await api.get(`/training/${trainId}`)
      const trainData = response.data.data
      this.setState({
        train: trainData
      })
    } catch(error) {
      Toast.show('请求错误')
    }
  }

  handleVideoPlay = () => {
    const { dispatch } = this.props
    const { train } = this.state
    const title = train['title']
    const videoName = train['video_name']
    const videoURL = train['video_url']
    const videoCoverURL = train['img']

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
    const { train } = this.state
    if(train === null) return null
    const videoSupported = train['video_name'] !== ""
    const detailRTF = train['details']
    return(
      <ScrollView>
        <View>
          <Image
            source={{ uri: train['img']}}
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
            {train['title']}
          </Text>
        </View>
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
        {/* 培训详情 */}
        <View styles={{ flex: 1 }}>
          <View
            style={{
              marginTop: 20,
              borderLeftWidth: 3,
              borderColor: Color.primary
            }}
          >
            <Text>
              培训介绍
            </Text>
          </View>
          <HTML
            html={ detailRTF }
            imagesMaxWidth={ Layout.window.width }
            ignoredStyles={['display',]}
          />
        </View>
        {/* 购买培训课？ */}


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

export default connect(mapStateToProps)(TrainDetailScreen)
