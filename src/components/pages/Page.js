import React, { Component } from 'react';

import './pages.css';

import Home from './Home'
import About from './About'
import Projects from './Projects'
import Project from './Project'

class Page extends Component {
  components = {
          home: Home,
          about: About,
          projects: Projects,
          project: Project
      }
render() {
  const PageToRender = this.components[this.props.page]
  console.log(this.props.page)
  return (
      <div>
        <PageToRender />
      </div>
    )
  }
}

export default Page;
