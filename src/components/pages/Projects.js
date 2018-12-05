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
                <Link to={`${match.url}/${data[result].slug}`}>
                  <p>
                    {index} -
                    {data[result].title.rendered}
                  </p>
                </Link>
              </li>
            ))}
          </div>
          <Route path={`${match.path}/:slug`} component={(props) => (<Project {...props} data={data} />)} />
        </div>
      </CSSTransition>
    )
  }
}

export default Projects


function Project({ location, match, data }) {
  const project = data.find((p) => p.slug === match.params.slug)

  return(
    <CSSTransition
           key={location.key}
           timeout={{ enter: 300, exit: 300 }}
           classNames={'fade'}
         >
      <div className="page">
        <div className="content">
          <img src={project.additional_fields.featured_image_src} alt={project.additional_fields.featured_image_alt} />
          <h1>{project.title.rendered}</h1>
          <p dangerouslySetInnerHTML={{__html: project.content.rendered}}></p>
          <p>role:</p> {project.additional_fields.role}
          <p>url:</p> {project.additional_fields.source_url}
          <p>technologies used:</p> {project.additional_fields.technologies_used}
        </div>
      </div>
    </CSSTransition>
  )
}
