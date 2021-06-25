import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from "./Header";
import LandingPage from "./LandingPage";
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>Survey New</h2>
class App extends Component {

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
      {/* BrowserRouter can only have ONE child, so put everything in a div */}
        <BrowserRouter>
          <div>
            {/* path="/" specifies the root route.  Relative path, no domain name included */}
            {/* Route will load ALL components that are found in the path, unless specified with
              'exact'.
              Ex without exact: "/surveys" path will also load component with "/" path */}
            <Header /> {/* Always appears no matter what */}
            <Route exact={true} path="/" component ={LandingPage} />
            <Route exact path="/surveys" component ={Dashboard} />
            <Route path="/surveys/new" component ={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
};

export default connect(null, actions)(App);
