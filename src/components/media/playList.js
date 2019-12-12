/*
 * Created by Saul at 2018/06/07
 *
 * 播放列表
 *
 */

import React from 'react'
import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  Animated,
  Easing
} from 'react-native'
import { Layout, Color, GlobalStyle, Font } from '../../constants'
import data from './__test__'

// const playListData = data.playList


class PlayList extends React.Component {

  render() {
    const trackList = this.props.trackList || []
    const { currenIndex, onPlayCurrent } = this.props

    // console.log('currendIndex', currenIndex );
    if(trackList.length === 0) {
      return null
    }

    return(
      <View>
        <Text style={ styles.listHeaderTitle }>
          播放列表
        </Text>
        <View style={ styles.listContainer }>
          {
            trackList.map((item, i) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    onPlayCurrent(i)
                  }}
                  key={i}
                  style={ styles.listItemContainer }
                >
                  <Text
                    // style={ styles.titleText }
                    style={{
                      color: currenIndex === i ? Color.primary : Color.medium,
                      fontSize: Font.small,
                    }}
                  >
                    { item.chapterTitle }
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
  listHeaderTitle: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: Font.small,
    color: Color.medium,
  },
  listContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
    // backgroundColor: '#999'
  },
  listItemContainer: {
    borderTopWidth: 0.5,
    borderColor: '#EEE',
    paddingVertical: 20,
    // backgroundColor: 'green'
  },
  titleText: {
    color: Color.medium,
    fontSize: Font.small,
  }
})

export default PlayList;
