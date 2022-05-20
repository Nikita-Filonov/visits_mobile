import React from 'react';
import {BackLayout} from '../../Components/Layouts/BackLayout';
import {connect} from 'react-redux';

const ViewPair = ({pair}) => {
  return <BackLayout title={pair.name} />;
};

const getState = state => ({pair: state.pairs.pair});
export default connect(getState, null)(ViewPair);
