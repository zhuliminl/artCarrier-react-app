/*
 * Created by Saul at 2018/05/30
 *
 * 课程讲师
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
import { Color, Font } from '../../../../constants'

class CourseSpeaker extends React.Component {
  static propTypes = {
    speaker: PropTypes.string,
    speakerPosition: PropTypes.string
  }

  render() {
    const { speaker, speakerPosition } = this.props
    return(
      <View style={ styles.container }>
        <View style={ styles.cellContainer }>
          <Text style={ styles.cellTitle }>讲师</Text>
          <Text style={ styles.cellContent }>{ speaker }</Text>
        </View>
        <View style={ styles.cellContainer }>
          <Text style={ styles.cellTitle }>职位</Text>
          <Text style={ styles.cellContent }>{ speakerPosition }</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10
  },
  cellContainer: {
    padding: 10,
    backgroundColor: Color.white,
    flexDirection: 'row',
    alignItems: 'center'

  },
  cellTitle: {
    marginRight: 20,
    color: Color.black,
    fontSize: Font.small
  },
  cellContent: {
    color: Color.medium,
    fontSize: Font.tiny
  }

})

export default CourseSpeaker;
