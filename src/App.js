import React, { Fragment, useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch
} from 'react-router-dom';

import getData from './api/getData'

import Navigation from './components/navigation/Navigation'

import Home from '../src/pages/Home';
import Projects from '../src/pages/Projects';
import Project from '../src/pages/Project';
import About from '../src/pages/About';

import './App.css';
import '../src/css/animations.css';


function App() {
  const [site, setSiteData] = useState({ state: { loaded: false, errors: false }, data: { menus: { main: null, social: null }, projects: null, about: null } });
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if(!site.state.loaded) {
      fetchData().then(
        r => {
          setSiteData({ state: { loaded: true }, data: { menus: { main: r[0], social: r[1] }, projects: r[2], about: r[3] } });
          setLoading(false);
        }
      ).catch(e => { 
        console.log(e);
        setSiteData({ state: { loaded: true, errors: true }, data: null });
      });
    }

  }, [site]);

  const fetchData = async () => {
    return await getData();
  };

  console.log({site});
  return (
      <div>
          { site.state.errors && <p>There were errors!</p>}
          { loading && <p>Wait I'm Loading for you</p> }
          { site.state.loaded &&       
            <Router>

              <Fragment>
                <Navigation data={site.data.menus.main} />
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
