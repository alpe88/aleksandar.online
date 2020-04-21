import React, { Fragment, useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
  useRouteMatch
} from 'react-router-dom';
import { TransitionGroup } from "react-transition-group";

import Home from '../src/pages/Home';
import Projects from '../src/pages/Projects';
import Project from '../src/pages/Project';
import About from '../src/pages/About';

import './App.css';
import '../src/css/animations.css';

const urls = [
  "https://cdn.aleksandar.online/wp-json/wp/v2/projects",
  "https://cdn.aleksandar.online/wp-json/wp/v2/pages?filter[name]=about"
]

function App() {
  const [siteData, setSiteData] = useState({projects: null, about: null});
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const fetchData = async () => {
      let promises = urls.map(url => fetch(url).then(r => r.json()));
      await Promise.all(promises).then(results => {
        setSiteData({ projects: results[0], about: results[1] });
      }).catch(error => console.log(error));
    };

    fetchData();
    setLoading(false);
  }, []);

  console.log(siteData);

  return (
      <div>
          {loading && <p>Wait I'm Loading comments for you</p>}
          {siteData !== 0 &&       
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
                  <About data={siteData.about} />
                </Route>                
                <Route path="/projects/:slug">
                  <Project data={siteData.projects} />
                </Route>
                <Route path="/projects">
                  <Projects data={siteData.projects} />
                </Route>
                <Route render={() => <h1>Page not found</h1>} />
              </Switch>
          </Router>
          }
      </div>
  );

}

export default App
