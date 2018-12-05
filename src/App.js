import React, { Component, Fragment } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink
} from 'react-router-dom';

import './App.css';
import Logo from './components/logo/Logo';

import Home from './components/pages/Home'
import About from './components/pages/About'
import Projects from './components/pages/Projects'

class App extends Component {
  state = {
    loading: true,
    projects: [],
    about: []
  }

  componentDidMount() {
    // store urls to fetch in an array
    const urls = [
      "https://aleksandar.online/wp-json/wp/v2/projects?_embed",
      "https://aleksandar.online/wp-json/wp/v2/pages?filter[name]=about?_embed"
    ]
    let promises = urls.map(url => fetch(url).then(y => y.json()))
    Promise.all(promises).then(results => {
        this.setState({
          projects: results[0],
          about: results[1],
          loading: false
        })
    })

    }
  render() {
    const { loading, projects, about } = this.state

    if(loading) {
      return 'LOADING'
    }
    return (
      <Router>
        <Fragment>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/projects">All Projects</NavLink>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={(props) => (<About {...props} data={about} />)} />
              <Route path="/projects" component={(props) => (<Projects {...props} data={projects} />)} />
              <Route render={() => <h1>Page not found</h1>} />
            </Switch>
        </Fragment>
      </Router>
    )
  }
}

export default App;
