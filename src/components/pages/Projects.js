import React, { Component } from 'react';

import {
  Link,
  Route
} from 'react-router-dom';

import './pages.css';

import Project from './Project'

class Projects extends Component {

  render() {
    const { match, data } = this.props

    return (
        <div className="page">
          <div id="projects" className="content">
            {Object.keys(data).map((result, index) => (
              <li key={data[result].id} className="inner-content">
                <Link to={`${match.path}/${data[result].slug}`}>
                  <p>
                    {index} -
                    {data[result].title.rendered}
                  </p>
                </Link>
              </li>
            ))}
          </div>
          <Route path={`${match.url}/:slug`} component={(props) => (<Project {...props} data={data} />)} />
        </div>
    )
  }
}

export default Projects
