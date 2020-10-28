import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import Payment from './pages/Payment/Payment';
import StartContestPage from './pages/StartContestPage/StartContestPage';
import Dashboard from './pages/Dashboard/Dashboard';
import withPrivateRouteHoc from './components/PrivateHoc/PrivateHoc';
import NotFound from './components/NotFound/NotFound';
import Home from './pages/Home/Home';
import OnlyNotAuthorizedUserHoc from './components/OnlyNotAuthorizedUserHoc/OnlyNotAuthorizedUserHoc';
import ContestPage from './pages/ContestPage/ContestPage';
import UserProfile from './pages/UserProfile/UserProfile';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ContestCreationPage from './pages/ContestCreation/ContestCreationPage';
import CONSTANTS from './constants';
import browserHistory from './browserHistory';
import ChatContainer from './components/Chat/ChatComponents/ChatContainer/ChatContainer';
import AuthRoute from './components/AuthRoute';

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/login"
            component={OnlyNotAuthorizedUserHoc(LoginPage)}
          />
          <Route
            exact
            path="/registration"
            component={OnlyNotAuthorizedUserHoc(RegistrationPage)}
          />
          <Route
            exact
            path="/payment"
            component={withPrivateRouteHoc(Payment)}
          />
          <AuthRoute exact path="/startContest" component={StartContestPage} />
          <Route
            exact
            path="/startContest"
            component={withPrivateRouteHoc(StartContestPage)}
          />
          <Route
            exact
            path="/startContest/nameContest"
            component={withPrivateRouteHoc(ContestCreationPage, {
              contestType: CONSTANTS.NAME_CONTEST,
              title: 'Company Name',
            })}
          />
          <Route
            exact
            path="/startContest/taglineContest"
            component={withPrivateRouteHoc(ContestCreationPage, {
              contestType: CONSTANTS.TAGLINE_CONTEST,
              title: 'TAGLINE',
            })}
          />
          <Route
            exact
            path="/startContest/logoContest"
            component={withPrivateRouteHoc(ContestCreationPage, {
              contestType: CONSTANTS.LOGO_CONTEST,
              title: 'LOGO',
            })}
          />
          <Route
            exact
            path="/dashboard"
            component={withPrivateRouteHoc(Dashboard)}
          />
          <Route
            exact
            path="/contest/:id"
            component={withPrivateRouteHoc(ContestPage)}
          />
          <Route
            exact
            path="/account"
            component={withPrivateRouteHoc(UserProfile)}
          />
          <Route component={NotFound} />
        </Switch>
        <ChatContainer />
      </Router>
    );
  }
}

export default App;
