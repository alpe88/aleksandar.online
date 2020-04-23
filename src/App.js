import React, { Fragment, useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
  useRouteMatch
} from 'react-router-dom';

import getData from './api/getData'

import Home from '../src/pages/Home';
import Projects from '../src/pages/Projects';
import Project from '../src/pages/Project';
import About from '../src/pages/About';

import './App.css';
import '../src/css/animations.css';


function App() {
  const [site, setSiteData] = useState({ state: { loaded: false, errors: false }, data: { projects: null, about: null } });
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if(!site.state.loaded) {
      fetchData().then(
        r => {
          setSiteData({ state: { loaded: true }, data: { projects: r[0], about: r[1] } });
          setLoading(false);
        }
      ).catch(e => { 
        console.log(e);
        setSiteData({ state: { loaded: true, errors: true } });
      });
    }

  }, [site]);

  const fetchData = async () => {
    return await getData();
  };

  console.log(site.data.about);
  console.log(site.data.projects);
  return (
      <div>
          { site.state.errors && <p>There were errors!</p>}
          { loading && <p>Wait I'm Loading for you</p> }
          { site.state.loaded &&       
            <Router>

              <Fragment>
                  <NavLink to="/about">About</NavLink>
                  <NavLink to="/projects">All Projects</NavLink>
              </Fragment>

              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/about">
                  <About data={site.data.about} />
                </Route>                
                <Route path="/projects/:slug">
                  <Project data={site.data.projects} />
                </Route>
                <Route path="/projects">
                  <Projects data={site.data.projects} />
                </Route>
                <Route render={() => <h1>Page not found</h1>} />
              </Switch>
          </Router>
          }
      </div>
  );

}

export default App
