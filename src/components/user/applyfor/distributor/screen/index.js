/*
 * Created by Saul at 2018/05/16
 *
 * 申请成为分销商
 *
 */

import React from 'react';
import Distributor from '../distributor'

class ApplyForDistributorScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: '申请成为分销商'
  })
  render() {
    return(
      <Distributor/>
    )
  }
}

export default ApplyForDistributorScreen;
