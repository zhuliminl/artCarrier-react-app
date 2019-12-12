/*
 * Created by Saul at 2018/05/23
 *
 * 分类屏幕页
 *
 */

import React from 'react';
import {
	View, FlatList, Text, Image, TouchableOpacity, StyleSheet, Platform
} from 'react-native';

import {
  Font, GlobalStyle, Color, Space
} from '../../../constants';
import TopBarNav from '../../common/topBarNav';

import { GoodList } from '../good/goodList';
import { CourseList } from '../course/courseList';
import { PosterList } from '../poster/posterList';
import { TrainList } from '../train/trainList';


const ROUTES = {
  GoodList,
  CourseList,
  PosterList,
  TrainList
};

const ROUTESTACK = [
  { label: '商品', title: 'GoodList' },
  { label: '课程', title: 'CourseList' },
  { label: '海报', title: 'PosterList' },
  { label: '培训', title: 'TrainList' },
];


class SortScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <TopBarNav
          // routeStack and renderScene are required props
          routeStack={ROUTESTACK}
          renderScene={(route, i) => {
            // This is a lot like the now deprecated Navigator component
            let Component = ROUTES[route.title];
            return <Component index={i} test={'test'}/>;
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    height: Platform.OS === 'ios' ? 80 : 50,
    borderBottomWidth: 1,
    borderColor: Color.homeBgDeep,
    // backgroundColor: Color.primary
    // Tag: newVersionColor
    backgroundColor: Color.homeBgDark,
  },
  labelStyle: {
    fontSize: 15,
    fontWeight: '500',
    color: Color.white,
  },
  imageStyle: {
    height: 20,
    width: 20,
    tintColor: '#e6faff'
  },
  underlineStyle: {
    height: 3,
    // Tag: newVersionColor
    backgroundColor: Color.homeBgDeep,
  }
});

export default SortScreen;
