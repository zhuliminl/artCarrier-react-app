/*
 * Created by Saul at 2018/05/22
 *
 * 列表单元
 *
 */

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import {
  Color, Font, Layout, Space
} from '../../../../constants';
import { withNavigation } from 'react-navigation'

class ListItem extends React.Component {
  render() {

    const { course, index } = this.props;
    const courseTitle = course['title'] || '';
    const courseId = course['id'] || '';

    const courseImageURLData = course['img'] || '';
    const courseImageURL = courseImageURLData.split(',')[0];


    const currentPrice = course['current_price'] || '';
    const oldPrice = course['old_price'] || '';

    const totalChapterNumber = course['total_chapter_number'] || 0;
    const updatedChapterNumber = course['updated_chapter_number'] || 0;

    const compositionStyle = this.props.compositionStyle || ' ';
    return (
      <TouchableOpacity
        style={ styles. container }
        onPress={() => {
          this.props.navigation.navigate('TrainDetail', {
            courseId,
            courseTitle
          })
        }}
      >
        {/* 右边商品图片 */}
        <View style={ styles.imageContainer }>
          <Image
            style={ styles.image }
            source={{ uri: courseImageURL }}
          />
        </View>
        {/* 左边商品信息 */}
        <View style={ styles.infoContainer }>
          <Text style={ styles.courseTitle }>{ courseTitle }</Text>
        {/* 价格和章节 */}
          <View style={ styles.coursePriceWithButtonContainer }>
            {/* 章节 */}
            <View style={ styles.chapterTextContainer }>
              <Text style={ styles.chapterText }>总章节{ totalChapterNumber }</Text>
              <Text style={ styles.chapterText }>已更新{ updatedChapterNumber }</Text>
            </View>
            {/* 价格 */}
            <View style={ styles.coursePriceTextContainer }>
              <View style={ styles.currentPriceContainer }>
                <Text style={ styles.currentPriceText }>¥{ currentPrice }</Text>
              </View>
              <View style={ styles.oldPriceContainer }>
                <Text style={ styles.oldPriceText }>¥{ oldPrice }</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )

  }
}

const styles = StyleSheet.create({
   container: {
    padding: 8,
    flexDirection: 'row',
    // Tag: newVersionColor
    backgroundColor: Color.homeBgDeep,
    marginBottom: 1

  },
   imageContainer: {
  },
   image: {
    width: 100,
    height: 100
  },
   infoContainer: {
    paddingLeft: Space.small,
    paddingRight: Space.small,
    flex: 1,
    flexDirection: 'column',
  },
   courseTitle: {
    flex: 1,
    color: Color.white,
  },
   coursePriceWithButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  chapterTextContainer: {
    flex: 1
  },
  chapterText: {
    fontSize: Font.tiny,
    color: Color.grey,
    lineHeight: 20
  },
   coursePriceTextContainer: {
    flexDirection: 'row',
    flex: 1
  },
   currentPriceContainer: {
    paddingRight: 10,
  },
   currentPriceText: {
    color: Color.primary
  },
   oldPriceText: {
    // textAlign: 'left',
     color: Color.grey,
     textDecorationLine: 'line-through'
  },

})

export default withNavigation(ListItem);
