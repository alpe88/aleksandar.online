import React, { Component } from 'react';
import { CSSTransition } from "react-transition-group";
import {
  Link,
  Route
} from 'react-router-dom';

import './pages.css';

class Projects extends Component {

  render() {
    const { location, match, data } = this.props
    return (
      <CSSTransition
             key={location.key}
             timeout={{ enter: 1000, exit: 1000 }}
             classNames={'fade'}
           >
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

        </div>
      </CSSTransition>
    )
  }
}

export default Projects
