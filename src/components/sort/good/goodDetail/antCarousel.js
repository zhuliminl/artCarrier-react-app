/*
 * Created by gyhml at 18-5-18
 *
 * 商品详情轮播图
 *
 */
import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Layout} from '../../../../constants';
import {Carousel} from 'antd-mobile';
export default class AntCarousel extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      imgHeight: 250,
      slideIndex: 0,
    }
  }

  componentDidUpdate() {
    // After the new child element is rendered, change the slideIndex
    // https://github.com/FormidableLabs/nuka-carousel/issues/327
    if (this.state.slideIndex !== this.state.data.length - 1) {
      /* eslint react/no-did-update-set-state: 0 */
      this.setState({ slideIndex: this.state.data.length - 1 });
    }
  }

  render() {
    return (
      <View>
        <Carousel
          autoplay={false}
          infinite
          selectedIndex={this.state.slideIndex}
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => console.log('slide to', index)}>
          {this.props.main_images.map((val, index) => {
            return (
              <TouchableOpacity
                key={val + index}
                style={{ width: '100%', height: this.state.imgHeight }}>
                <Image
                  source={
                    val === "" ?
                      require('../../../../assets/image/logo.png')
                      : {
                        uri: val
                      }
                  }
                  style={{ width: Layout.window.width,height:250}}
                  onLoad={() => {
                    this.setState({ imgHeight: 250 });
                  }}
                />
              </TouchableOpacity>
            )
          })}
        </Carousel>
      </View>
    );
  }
}
