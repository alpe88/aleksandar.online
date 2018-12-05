import React, { Component } from 'react';
import { CSSTransition } from "react-transition-group";
import './pages.css';

class Project extends Component {

render() {
    const { location, match, data } = this.props
    console.log(data)
    const project = data.find((p) => p.slug === match.params.slug)

    console.log(project)
    return (
      <CSSTransition
             key={location.key}
             timeout={{ enter: 1000, exit: 1000 }}
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
}

export default Project
