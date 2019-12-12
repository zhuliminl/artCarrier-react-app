/*
 * Created by qm06 at 18-6-13
 *
 * 消息中心
 *
 */

import React from 'react';
import {View, StyleSheet} from 'react-native';
import DefaultPage from '../../../common/defaultPage/index';
import Course  from '../course';
import { withNavigation } from 'react-navigation'

 class CourseScreen  extends React.Component {
  render() {
    let data = [1, 2, 3];
    if (!data || data.length === 0) {
      return (
        <View>
          <DefaultPage message={'暂无消息'}/>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <Course
            navigation={ this.props.navigation }
          />
        </View>
      )
    }

  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  }
});
export default withNavigation(CourseScreen)
