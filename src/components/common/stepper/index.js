/*
 * Created by Saul at 2018/06/02
 *
 * 步进器
 *
 */

import React from 'react';
import PropTypes from 'prop-types'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import {
  Color,
  Font,
  GlobalStyle,
  Layout
} from '../../../constants';
import Toast from '../toast'

class Stepper extends React.Component {
  static propTypes = {
    min: PropTypes.number,
    value: PropTypes.number,
    step: PropTypes.number,
    defaultValue: PropTypes.number,
    onChange: PropTypes.func
  }

  static defaultProps = {
    min: 1,
    // step 是每次的变动值
    step: 1,
    defaultValue: 0,
    onChange: () => {}
  }

  constructor(props) {
    super(props)
    this.state = {
      value: props.value ? props.value : (props.defaultValue ? props.defaultValue : 0)
    }
  }

  handleOnPlus = () => {
    let {value, step, min, onChange} = this.props;
    if(value === undefined) {
      value = this.state.value
    }

    value += step
    this.setState({ value },
      () => {
        onChange && onChange(step)
      }
    )
  }

  handleOnMinus = () => {
    let {value, step, min, onChange} = this.props;
    if(value === undefined) {
      value = this.state.value
    }

    value -= step
    if(value < min) {
      value = min
      // console.log('value equal to min')
      Alert.alert('如果想要删除订单，请点击右上角管理按钮')
      // Toast.show('已经是最小了，不可以再点击了', Toast.LONG)
    }
    this.setState({ value },
      () => {
        onChange && onChange(-step)
      }
    )
  }

  render() {
    return(
      <View style={ styles.container }>
        <TouchableOpacity
          style={ styles.stepperButtonContainer }
          onPress={() => {
            this.handleOnMinus()
            Toast.show('减1')

          }}
        >
          <Text style={ styles.stepperText }>
            -
          </Text>
        </TouchableOpacity>
        <View style={ styles.stepperTextContainer }>
          <Text style={ styles.stepperText }>
            {this.state.value}
          </Text>
        </View>
        <TouchableOpacity
          style={ styles.stepperButtonContainer }
          onPress={() => {
            this.handleOnPlus()
            Toast.show('加1')

          }}
        >
          <Text style={ styles.stepperText }>
            +
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Stepper;


const styles = StyleSheet.create({
  container: {
    // paddingLeft: 10,
    // paddingRight: 10,
    flexDirection: 'row',
    borderRadius: 2,
    borderWidth: 1,
    // borderColor: '#EEE'
    // Tag: nerVersionColor
    borderColor: Color.homeBgLight,
  },
  stepperButtonContainer: {
    width: 30,
  },
  stepperTextContainer: {
    // marginLeft: 7,
    // marginRight: 7,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    // borderColor: '#EEE',
    // Tag: nerVersionColor
    borderColor: Color.homeBgLight,
    paddingLeft: 10,
    paddingRight: 10
  },
  stepperText: {
    textAlign: 'center',
    fontSize: 14,
    color: Color.grey
  }
})
