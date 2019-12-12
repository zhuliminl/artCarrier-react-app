/*
 * Created by Saul at 2018/05/29
 *
 * 课程详情的概要
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { Color, Layout, Space, Font } from '../../../../constants'


const CourseSummary = ({
  currentPrice,
  oldPrice,
  totalChapterNumber,
  updatedChapterNumber}) => (
    <View style={ styles.container }>
      <View style={ styles.priceContainer }>
        <View style={ styles.currentPriceContainer }>
          <Text style={ styles.currentPriceText }>{ currentPrice }艺币</Text>
        </View>
        <View style={ styles.oldPriceContainer }>
          <Text style={ styles.oldPriceText }>{ oldPrice }艺币</Text>
        </View>
        <View style={ styles.specialTagContainer }>
          <Text style={ styles.specialTagText }>特价优惠</Text>
        </View>
      </View>
      <View style={ styles.chapterInfoContainer }>
        <Text style={ styles.chapterInfoText }>已开课{ totalChapterNumber }节 | 更新到 { updatedChapterNumber }节</Text>
      </View>
    </View>
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.white,
    padding: 10,
  },

  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  currentPriceContainer: {
  },
  currentPriceText: {
    fontSize: Font.large,
    color: Color.primary,
    fontWeight: 'bold'
  },

  oldPriceContainer: {
    padding: 5,
    marginRight: 10,
    marginLeft: 10
  },
  oldPriceText: {
    textDecorationLine: 'line-through',
    color: Color.grey
  },

  specialTagContainer: {
    backgroundColor: Color.primary,
    padding: 5,
    paddingTop: 2,
    paddingBottom: 2,
    borderRadius: 4,
  },
  specialTagText: {
    fontSize: 12,
    color: Color.white
  },

  chapterInfoContainer: {
    paddingTop: 5
  },
  chapterInfoText: {
    color: Color.medium
  }

})

export default CourseSummary
