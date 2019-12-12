/*
 * Created by gyfhml at 18-6-13
 *
 * 首页发现模块
 *
 */

import React from 'react';
import {View, StyleSheet} from 'react-native';
import Find from '../Find';

export default class FindScreen  extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Find navigation={this.props.navigation}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1
  }
});
