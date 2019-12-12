/*
 * Created by Saul at 2018/05/22
 *
 * 列表单元
 *
 */

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Color, Space } from '../../../constants';
import { withNavigation } from 'react-navigation'

class ListItem extends React.Component {
  render() {
    const { course, index } = this.props;
    const courseTitle = course['title'] || '';
    const courseName = course['name'] || '';
    const courseId = course['id'] || '';
    const title = course['title'] || '';
    const item_id = course['item_id'] || '';
    const courseImageURLData = course['main_images'] || '';
    const courseImageURL = courseImageURLData.split(',')[0];
    const currentPrice = course['current_price'] || '';
    const oldPrice = course['old_price'] || '';

    return (
      <TouchableOpacity
        style={ styles. container }
        onPress={() => {
          this.props.navigation.navigate('GoodDetail', {
            goodId:item_id,
            good:course,
            goodName:title
          })
        }}
      >
        <Image
          style={ styles.image }
          source={
            courseImageURL === ""
              ? require('../../../assets/image/logo.png') :
              {
                uri: courseImageURL
              }
          }
        />
        <View style={ styles. infoContainer }>
          <Text style={ styles. courseTitle }>{ courseTitle }</Text>
          <Text style={ styles. courseTitle }>{ courseName }</Text>
          <View style={ styles. coursePriceWithButtonContainer }>
            <View style={ styles. coursePriceTextContainer }>
              <View style={ styles. currentPriceContainer }>
                <Text style={ styles. currentPriceText }>¥{ currentPrice }</Text>
              </View>
              <View style={ styles. oldPriceContainer }>
                <Text style={ styles. oldPriceText }>¥{ oldPrice }</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )

  }
}

const styles = StyleSheet.create({
   container: {
    padding: 8,
    flexDirection: 'row',
    backgroundColor: Color.white,
    marginBottom: 1

  },
   image: {
    width: 100,
    height: 100
  },
   infoContainer: {
    paddingLeft: Space.small,
    paddingRight: Space.small,
    flex: 1,
    flexDirection: 'column',
  },
   courseTitle: {
    flex: 1,
    color: Color.black
  },
   coursePriceWithButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
   coursePriceTextContainer: {
    flexDirection: 'row',
    flex: 1
  },
   currentPriceContainer: {
    paddingRight: 10,
  },
   currentPriceText: {
    color: Color.primary
  },
   oldPriceText: {
     color: Color.grey,
     textDecorationLine: 'line-through'
  },

})

export default withNavigation(ListItem);
