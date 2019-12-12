/*
 * Created by Saul at 2018/05/24
 *
 * 课程详情模块
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  ScrollView,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Alert
} from 'react-native'
import {
  Color, Font, Layout, Space
} from '../../.././../constants'

import CoursePoster from './coursePoster'
import CourseSummary  from './courseSummary'
import CourseSpeaker  from './courseSpeaker'
import CourseIntro from './courseIntro'
import CourseChapters from './courseChapters'

import TopBarNav from '../../../common/topBarNav'



class CourseDetail extends React.Component {
  static propTypes = {
    course: PropTypes.object
  }

  static defaultProps = {
    course: null
  }


  render() {
    const { course } = this.props
    if(course === null) {
      return null
    }
    // console.log('course', course)

    // 课程信息
    const courseTitle = course['title']
    const coursePosterURL = course['img']
    const courseVideoURL = course['video']
    // 价格信息
    const oldPrice = course['old_price']
    const currentPrice = course['current_price']
    // 课程简介富文本
    const detailRTF = course['details']
    // 章节信息
    const totalChapterNumber = course['total_chapter_number']
    const updatedChapterNumber = course['updated_chapter_number']
    const courseChapterList = course['courseChapter']
    // 暂时未定
    const category = ''
    // 讲师信息
    const speaker = course['speaker_name']
    const speakerPosition = course['speaker_position']
    // 供应商信息
    const supplierInfo = course['supplierInfo']

    return(
      <ScrollView>
        {/* 课程海报 */}
        <CoursePoster
          coursePosterURL={ coursePosterURL }
          courseTitle={ courseTitle }
        />
        {/* 课程简要 */}
        <CourseSummary
          currentPrice={ currentPrice }
          oldPrice={ oldPrice }
          totalChapterNumber={ totalChapterNumber }
          updatedChapterNumber={ updatedChapterNumber }
        />

        {/* 课程讲师 */}
        <CourseSpeaker
          speaker={ speaker }
          speakerPosition={ speakerPosition }
        />
        {/* 课程简介和课程章节 */}
        <TopBarNav
          routeStack={[
            {
              label: '简介',
              title: 'CourseIntro'
            },
            {
              label: '课程',
              title: 'CourseChapters'
            },
          ]}
          renderScene={(route, i) => {
            let Routes = { CourseIntro, CourseChapters }
            let Component = Routes[route.title];
            return (
              <Component
                navigation={ this.props.navigation }
                index={i}
                data={{
                  detailRTF,
                  courseChapterList
                }}
              />
            )
          }}
          // Below are optional props
          headerStyle={[styles.headerStyle, { paddingTop: 20 }]}
          labelStyle={styles.labelStyle}
          underlineStyle={styles.underlineStyle}
          imageStyle={styles.imageStyle}
          sidePadding={40}
          inactiveOpacity={1}
          fadeLabels={false}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    borderBottomWidth: 0,
    borderColor: Color.white,
    backgroundColor: Color.white
  },
  labelStyle: {
    fontSize: 15,
    fontWeight: '500',
    color: Color.primary
  },
  imageStyle: {
    height: 20,
    width: 20,
    tintColor: '#e6faff'
  },
  underlineStyle: {
    height: 1,
    backgroundColor: Color.primary
  }
});

export default CourseDetail;
