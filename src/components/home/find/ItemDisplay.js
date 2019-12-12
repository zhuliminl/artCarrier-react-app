/*
 * Created by Saul at 2018/07/06
 *
 * 首页商品展示
 *
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView
} from "react-native";
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import { Color } from '../../../constants'
import ItemGallery from './ItemGallery'

/*
部分机型有卡顿问题
解决思路
先二级 tab 栏目给渲染好再说

*/

class ItemDisplay extends React.Component {

  render() {
    const { tabLabels } = this.props
    return (
      <ScrollableTabView
        style={{
          // backgroundColor: Color.homeBgDeep
          backgroundColor: Color.homeBgDark
          // marginTop: 20,
        }}
        tabBarTextStyle={{
          color: Color.white
        }}
        tabBarUnderlineStyle={{
          // backgroundColor: Color.homeUnderline
          backgroundColor: Color.homeBgDeep
        }}
        initialPage={0}
        renderTabBar={() => <ScrollableTabBar style={{ borderWidth: 0 }} />}
      >
        <View tabLabel={'推荐'}>
          {/* 推荐 */}
          <ItemGallery
            navigation={ this.props.navigation }
            isFromRecommendTab
            // 推荐页面的分类为空
            categoryId={'none'}
          />
        </View>
        {
          tabLabels.map(label => (
            <View key={label.title} tabLabel={label.title}>
              {/* 商品画廊 */}
              <ItemGallery
                navigation={ this.props.navigation }
                categoryId={label.id}
              />
            </View>
          ))
        }
      </ScrollableTabView>
    )
  }
}

export default ItemDisplay;
