import React, { Component, Fragment } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink
} from 'react-router-dom';

import './App.css';
import Logo from './components/logo/Logo';
import Page from './components/pages/Page'

class App extends Component {
  state = {
    loading: true,
  }

  componentDidMount() {
        this.setState({
          loading: false
        })
  }

  render() {
    const { loading } = this.state
    if(loading) {
      return 'LOADING'
    }

    return (
      <Router>
        <Fragment>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/projects">All Projects</NavLink>
            <Switch>
              <Route exact path="/" component={(props) => (<Page {...props} page="home" />)} />
              <Route path="/about" component={(props) => (<Page {...props} page="about" />)} />
              <Route exact path="/projects/:slug" component={(props) => (<Page {...props} page="project" />)} />
              <Route path="/projects" component={(props) => (<Page {...props} page="projects" />)} />
              <Route render={() => <h1>Page not found</h1>} />
            </Switch>
        </Fragment>
      </Router>
    );
  }
}

export default App;
