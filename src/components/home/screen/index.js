/*
 * Created by gyfhml at 18-6-13
 *
 * 首页主入口
 *
 */

import React from 'react';
import {View, StyleSheet, Platform, StatusBar, Text} from 'react-native';
import TopBarNav from '../../common/topBarNav';
import {Color} from '../../../constants';
import FindScreen from '../find/screen/';
import CourseScreen from '../course/screen/';
import RNExitApp from 'react-native-exit-app';
import { AndroidBackHandler } from '../../../utils/BackHandler.android'

/*
class Test1 extends React.Component {

  render() {
    return(
      <View>
        <Text>
          tab1
        </Text>
      </View>
    )
  }
}
class Test2 extends React.Component {

  render() {
    return(
      <View>
        <Text>
          tab2
        </Text>
      </View>
    )
  }
}
const ROUTES = {
  Test1,
  Test2
};
const ROUTESTACK = [
  {label: '发现', title: 'Test1'},
  {label: '课程', title: 'Test2'},
];
*/


const ROUTES = {
  FindScreen,
  CourseScreen
};
const ROUTESTACK = [
  {label: '发现', title: 'FindScreen'},
  {label: '课程', title: 'CourseScreen'},
];

export default class HomeScreen extends React.Component {
  handleBackPress = () => {
    RNExitApp.exitApp();
  }
  render() {
    return (
      <AndroidBackHandler
        onBackPress={() => {
          this.handleBackPress()
        }}
      >
        <View style={styles.container}>
          <StatusBar
             // backgroundColor={ Color.homeBgDeep }
             backgroundColor={ Color.homeBgDark }
             barStyle="light-content"
           />
          <TopBarNav
            // routeStack and renderScene are required props
            routeStack={ROUTESTACK}
            renderScene={(route, i) => {
              // This is a lot like the now deprecated Navigator component
              let Component = ROUTES[route.title];
              return <Component index={i} test={'test'}/>;
            }}
            // Below are optional props
            headerStyle={[styles.headerStyle, {paddingTop: 20}]}
            labelStyle={styles.labelStyle}
            underlineStyle={styles.underlineStyle}
            imageStyle={styles.imageStyle}
            sidePadding={40}
            inactiveOpacity={1}
            fadeLabels={false}
            scrollViewProps={{
              scrollEnabled: false
            }}
          />
        </View>
      </AndroidBackHandler>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.homeBgDark,
  },
  headerStyle: {
    height: Platform.OS === 'ios' ? 80 : 50,
    borderBottomWidth: 0,
    borderColor: Color.bg,
    // backgroundColor: Color.primary
    // backgroundColor: '#03132E'
    // backgroundColor: Color.homeBgDeep,
    backgroundColor: Color.homeBgDark
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
    // backgroundColor: Color.white
    // backgroundColor: Color.homeUnderline
    backgroundColor: Color.homeBgDeep
  }
});
