/*
 * Created by Saul at 2018/05/10
 *
 * 我的课程
 *
 */

import React from 'react';
import { View, Text } from 'react-native';
import { Color } from '../../../../constants';
import DynamicList from '../../../common/dynamicList'
import ListItem from '../listItem'


class MyCourseScreen extends React.Component {
  state = {
    routerPath: '/user/course',
  }


  render() {

    return(
      <DynamicList
        routerPath={ this.state.routerPath }
        renderItem={({ item, index }) => {
          return (
            <ListItem
              course={ item }
              index={ index }
            />
          )
        }}
      />
    )
  }
}

export default MyCourseScreen;
