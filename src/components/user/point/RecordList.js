/*
 * Created by Saul at 2018/05/14
 *
 * 积分记录历史列表
 *
 * 暂时主要积分提现的历史记录
 * 一个完整的积分页面可能包括：积分兑换、积分商城、提现记录
 *
 */

import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { Color, Layout, Space } from '../../../constants';
import { pointData } from './__test__';
import DefaultPage from '../../common/defaultPage';

const ListItem = ({ record }) => (
  <View style={ styles.listItemContainer }>
      <Text style={ styles.descText }>
        { record.desc }
      </Text>
      <Text style={ styles.timestampText }>
        { record.timestamp }
      </Text>
      <Text
        style={{
          width: 50,
          textAlign: 'right',
          paddingRight: 10,
          color: record.change > 0 ? 'green' : 'red'
        }}
      >
        { record.change }
      </Text>
  </View>
)

class RecordList extends React.Component {

  render() {
    const recordDataList = pointData.record;
    // const recordDataList = [];

    if(!Array.isArray(recordDataList) || recordDataList.length === 0) {
      return (
        <DefaultPage message={'你最近没有提取记录'} />
      )
    }

    return(
      <View style={ styles.container }>
        <Text style={ styles.listHeader }>
          积分记录
        </Text>
        <ScrollView style={ styles.listContainer }>
          {
            recordDataList.map((item, i) => (
              <ListItem
                key={i}
                record={ item }
              />
            ))
          }
          <Text style={ styles.tipsText }>
            温馨提示： 本记录查询默认查询最近3个月的积分变更记录
          </Text>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
    backgroundColor: Color.white
  },
  listHeader: {
    paddingLeft: Space.medium,
    color: Color.medium
  },
  listContainer: {
    height: Layout.window.height - 340
  },
  listItemContainer: {
    padding: Space.medium,
    flexDirection: 'row',
    borderBottomColor: Color.bg,
    borderBottomWidth: 1,
  },
  descText: {
    color: Color.black,
    flex: 1
  },
  timestampText: {
    includeFontPadding: true,
    color: Color.grey
  },
  tipsText: {
    color: Color.grey,
    padding: Space.small,
    textAlign: 'center'
  }
})

export default RecordList;

