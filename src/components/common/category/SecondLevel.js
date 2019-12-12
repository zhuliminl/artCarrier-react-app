/*
 * Created by Saul at 2018/06/25
 *
 * 二级分类
 *
 */

import React from 'react';
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
} from 'react-native';
import {
  Color, Font, Layout, Space
} from '../.././../constants';
import Loading from '../loading'


class SecondLevel extends React.Component {

  render() {
    const {
      data,
      title,
      onPositionSet,
      onSearchByCategory,
      index,
    } = this.props
    return(
      <View
        onLayout={(event) => {
          // 记录初次渲染的位置
          const nativeEvent = event.nativeEvent
          const positionY = nativeEvent.layout.y
          onPositionSet(positionY, index)
          // console.log('=====>>>>>各个项目的位置', nativeEvent);
        }}
        style={styles.container}
      >
        {/* 标题 */}
        <View style={styles.titileContainer}>
          <Text style={styles.titleText}> {title} </Text>
        </View>
        <View style={styles.itemsContainer}>
          {/* 宫格列表 */}
          {
            data.map((item, i) => {
              const img = item.img
              return (
                <TouchableOpacity
                  onPress={() => {
                    this.props.onSearchByCategory(item.id)
                  }}
                  key={i}
                  style={styles.itemContainer}
                >
                  <Image
                    source={
                      img === "" ?
                        require('../../../assets/image/logo.png')
                        : { uri: img }
                    }
                    style={styles.image}
                  />
                  <Text style={styles.itemText}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    backgroundColor: '#FFF',
    paddingLeft: 10,
    // paddingVertical: 30,
    marginVertical: 3,
  },
  // 宫格容器
  itemsContainer: {
    // justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  // 宫格项
  itemContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center'

  },
  itemText: {
    color: Color.black,
    fontSize: 11,
  },
  titileContainer: {
    // paddingHorizontal: 20,
    paddingVertical: 10,
  },
  titleText: {
    fontWeight: 'bold',
    color: Color.black
  },
  image: {
    marginBottom: 5,
    borderRadius: 25,
    height: 50,
    width: 50
  }
})

export default SecondLevel;


