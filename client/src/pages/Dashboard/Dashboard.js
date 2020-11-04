import React from 'react';
import { ROLES } from '../../constants';
import CustomerDashboard from '../../components/CustomerDashboard/CustomerDashboard';
import CreatorDashboard from '../../components/CreatorDashboard/CreatorDashboard';
import Header from '../../components/Header/Header';
import {connect, useSelector} from 'react-redux';

const Dashboard = props => {
  const {user: {role}} = useSelector(state => state.auth);
  const { history } = props;
  return (
    <div>
      <Header />
      {role === ROLES.CUSTOMER ? (
        <CustomerDashboard history={history} match={props.match} />
      ) : (
        <CreatorDashboard history={history} match={props.match} />
      )}
    </div>
  );
};

export default Dashboard;
