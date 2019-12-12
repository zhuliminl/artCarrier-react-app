/*
 * Created by Saul at 2018/05/29
 *
 * 课程章节
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import {
  Color, Layout, Space, Font
} from '../../../../constants'
import DefaultPage from '../../../common/defaultPage'
import Toast from '../../../common/toast'

import { addToPlaylist } from '../../../media/reducer/actions'


class ChapterItem extends React.Component {

  handleChapterItemClick = () => {
    const {
      navigation,
      title,
      chapterPosterURL,
      videoURL,
    } = this.props

    const { dispatch } = this.props
    dispatch(
      addToPlaylist({
        chapterTitle: title,
        courseTitle: title,
        speaker: '导师周杰伦',
        mediaURL: videoURL ? videoURL : 'http://www.simplerestfulblog.com/demo/closure.mp4',
        mediaCoverURL: chapterPosterURL
      })
    )
    Toast.show('已添加到播放列表')
    navigation.navigate('媒体')
  }

  render() {
    // console.log('chpter item', this.props)
    // 暂时只取渲染所需要的字段
    const {
      title,
      chapterPosterURL,
      videoURL,
      studyTime,
      studyNumber
    } = this.props
    console.log('=====>>>>>video', this.props);
    return (
      <View style={ styles.chapterItemContainer }>
        {/* 视频 */}
        <ImageBackground
          style={ styles.chapterPoster }
          source={{ uri: chapterPosterURL }}
        >
          <TouchableOpacity
            style={ styles.iconPlayContainer }
            onPress={() => {
              this.handleChapterItemClick()
            }}
          >
            <Image
              style={ styles.iconPlay }
              source={ require('../../../../assets/icon/sort/play.png') }
            />
          </TouchableOpacity>
        </ImageBackground>
        {/* 课程信息 */}
        <View style={ styles.chapterInfoContainer }>
          <View style={ styles.chapterTitleContainer }>
            <Text style={ styles.chapterTitleText }>{ title }</Text>
          </View>
          <View style={ styles.chapterStatisticsContainer }>
            <Text style={ styles.chapterStatisticsText }>{ studyTime }</Text>
            <Text style={ styles.chapterStatisticsText }>{ studyNumber }人次</Text>
          </View>
        </View>

      </View>
    )
  }
}

class CourseChapters extends React.Component {
  render() {
    // console.log('CourseChapters props', this.props)
    const data = this.props.data || {}
    const courseChapterList = data.courseChapterList || []
    if(courseChapterList.length === 0) {
      return <DefaultPage message={'没有课程内容'} />
    }
    return(
      <View style={ styles.chapterContainer }>
        {
          courseChapterList.map((item, i) => {
            // console.log('key', i)
            return (
              <ChapterItem
                dispatch={this.props.dispatch}
                navigation={ this.props.navigation }
                key={i}
                courseChapterId={ item['courseChapter_id'] }
                title={ item['title'] }
                oldPrice={ item['old_price'] }
                currentPrice={ item['current_price'] }
                chapterPosterURL={ item['img'] }
                fileId={ item['file_id'] }
                videoName={ item['video_name'] }
                videoURL={ item['video_url'] }
                coverName={ item['cover_name'] }
                coverURL={ item['cover_url'] }
                studyNumber={ item['study_number'] }
                studyTime={ item['start_time'] }
              />
            )
          })
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  chapterContainer: {
    backgroundColor: Color.white,
  },
  chapterItemContainer: {
    flexDirection: 'row',
    margin: 10,
  },
  chapterPoster: {
    // position: 'relative',
    width: 150,
    height: 100
  },
  iconPlayContainer: {
    flex: 1,
    // backgroundColor: '#999',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconPlay: {
    width: 40,
    height: 40,
    // position: 'absolute',

  },
  chapterInfoContainer: {
    flexDirection: 'column'
  },
  chapterTitleContainer: {
    padding: 10,
    flex: 1
  },
  chapterTitleText: {
    fontSize: Font.small,
    color: Color.black
  },
  chapterStatisticsContainer: {
    padding: 10,
    // backgroundColor: '#999'
  },
  chapterStatisticsText: {
    lineHeight: 20,
    fontSize: Font.tiny,
    color: Color.grey
  }

})

export default connect(null)(CourseChapters)
