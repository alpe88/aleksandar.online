import React, { Component } from 'react';

import './pages.css';

class Project extends Component {

    getProject = (projects, query) => {
      console.log("projects, passed in from params",projects)
      console.log("query, passed in from match",query)
      let foundProject = projects.find((p) => p.slug === query)
      console.log("foundProject, after projectMatch runs the find function", foundProject)
    }

  render() {
    const { match, data } = this.props
    let project = this.getProject(data, match.params.slug)
          console.log("project, after getProject in componentDidMount runs ", project)

    return (
        <div className="page">
          <div className="content">
            <h1>{project.title.rendered}</h1>
            <p dangerouslySetInnerHTML={{__html: project.content.rendered}}></p>
          </div>
        </div>
    );
  }
}

export default Project
