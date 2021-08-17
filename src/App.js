import React, { Fragment, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";

import getData from "./api/getData";

import Navigation from "./components/navigation/NavigationMain";

import Home from "../src/pages/Home";
import Projects from "../src/pages/Projects";
import Project from "../src/pages/Project";
import About from "../src/pages/About";

import "./App.css";
import "../src/css/animations.css";

function App() {
  const [site, setSiteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!site.state.loaded) {
      fetchData()
        .then((data) => {
          setSiteData(data);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setError(e);
        });
    }
  }, [site]);

  const fetchData = async () => {
    return await getData();
  };

  if (loading) {
    return <p>..this is a faux spinny component...</p>;
  }

  if (error) {
    console.log({ error });
    return <p>...this is a faux error component...</p>;
  }

  console.log({ site });
  return (
    <div>
      <Router>
        <Fragment>
          <Navigation data={site.data.menus.main} />
        </Fragment>

        <Switch>
          <Route exact path="/">
            <Home data={site.data} />
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
    </div>
  );
}

export default App;
