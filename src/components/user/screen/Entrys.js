/*
 * Created by Saul at 2018/05/07
 *
 * 用户中心的课程属性模块、会员属性模块、分销属性模块的入口
 *
 */
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import TouchableOpacity from '../../../utils/TouchableItem';
import { Font, Space, Color } from '../../../constants';
import Info from '../info';
import OrderEntry from './orderEntry';
import NavigationService from '../../../navigation/NavigationService';

// 用户中心页面的会员属性和课程属性以及分销属性的入口配置数据
const entryConfig = {
  member: [
    // {
      // title: '开屏测试',
      // iconUrl: require('../../../assets/icon/user/coupon.png'),
      // routeName: 'Splash'
    // },
    {
      title: '登录',
      iconUrl: require('../../../assets/icon/user/coupon.png'),
      routeName: 'Login'
    },
    {
      title: '我的优惠券',
      iconUrl: require('../../../assets/icon/user/coupon.png'),
      routeName: 'Coupon'
    },


    {
      title: '我的积分',
      iconUrl: require('../../../assets/icon/user/point.png'),
      routeName: 'Point'
    },

    {
      title: '我的佣金',
      iconUrl: require('../../../assets/icon/user/balance.png'),
      routeName: 'Brokerage'
    },



  ],
  course: [
    {
      title: '我的收藏',
      iconUrl: require('../../../assets/icon/user/collection.png'),
      routeName: 'Collection'
    },
    {
      title: '我的课程',
      iconUrl: require('../../../assets/icon/user/course.png'),
      routeName: 'MyCourse'
    },
    {
      title: '我的足迹',
      iconUrl: require('../../../assets/icon/user/foot.png'),
      routeName: 'Track'
    },
  ],
  distribution: [
    // {
      // title: '分销中心',
      // iconUrl: require('../../../assets/icon/user/distributor.png'),
      // routeName: 'Coupon'
    // },
    // {
      // title: '分销专题',
      // iconUrl: require('../../../assets/icon/user/subject.png'),
      // routeName: 'Coupon'
    // },
    {
      title: '申请成为分销商',
      iconUrl: require('../../../assets/icon/user/apply.png'),
      routeName: 'ApplyForDistributor'
    },
    {
      title: '关于我们',
      iconUrl: require('../../../assets/icon/user/apply.png'),
      routeName: 'AboutUs'
    },
    {
      title: '修改密码',
      iconUrl: require('../../../assets/icon/user/apply.png'),
      routeName: 'ChangePassword'
    },

    {
      title: '收货地址管理',
      iconUrl: require('../../../assets/icon/user/apply.png'),
      routeName: 'AddressList'
    },

    // 不做代理商
    // {
      // title: '申请成为代理商',
      // iconUrl: require('../../../assets/icon/user/apply.png'),
      // routeName: 'ApplyForAgent'
    // },
  ],
}

const EntryItem = ({ title, iconUrl, routeName }) => (
  <TouchableOpacity
    onPress={() => {
      NavigationService.navigate(routeName);
    }}
  >
    <View
      style={{
        paddingHorizontal: 15,
        paddingVertical: 15,
        flexDirection: 'row',
        borderBottomColor: Color.homeBgLight,
        borderWidth: 0.5,
        backgroundColor: Color.homeBgDeep,
      }}
    >
      <Image
        style={ styles.entryItemIcon }
        source={ iconUrl }
      />
      <Text style={{ color: Color.white, }}>{ title }</Text>
    </View>
  </TouchableOpacity>
)



// 用户会员属性的入口
class MemberRelatedEntry extends React.Component {
  render() {
    return(
      <View style={ styles.listContainer } >
          {
            entryConfig.member.map((item, i) => (
              <EntryItem
                key={i}
                title={ item.title }
                iconUrl={ item.iconUrl }
                routeName={ item.routeName }
              />
            ))
          }
      </View>
    )
  }
}


// 用户课程属性的入口
class CourseRelatedEntry extends React.Component {
  render() {
    return(
      <View
        style={ styles.listContainer }
      >
          {
            entryConfig.course.map((item, i) => (
              <EntryItem
                key={i}
                title={ item.title }
                iconUrl={ item.iconUrl }
                routeName={ item.routeName }
              />
            ))
          }
      </View>
    )
  }
}

// 用户分销属性的入口
class DistributionRelatedEntry extends React.Component {
  render() {
    return(
      <View style={ styles.listContainer } >
          {
            entryConfig.distribution.map((item, i) => (
              <EntryItem
                key={i}
                title={ item.title }
                iconUrl={ item.iconUrl }
                routeName={ item.routeName }
              />
            ))
          }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  listContainer: {
    paddingTop: Space.small,
    backgroundColor: Color.homeBgDark,
  },
  entryItemText: {
    // 允许在常量尺寸上进行适度的微调
    // 但调整幅度值一定要小于等级区间差的一半
    // GOOD: Space.small + 4
    // BAD: Space.small + 6
    paddingTop: Space.small + 2,
    paddingBottom: Space.small + 2,
    color: Color.white,
  },
  entryItemIcon: {
    marginRight: 10,
    width: 20,
    height: 20
  }

})

export {
  Info,
  OrderEntry,

  MemberRelatedEntry,
  CourseRelatedEntry,
  DistributionRelatedEntry
};
