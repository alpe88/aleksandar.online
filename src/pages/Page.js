import React, { Component } from 'react';

import './pages.css';

import Home from './Home'
import About from './About'
import Projects from './Projects'
import Project from './Project'

const PageShell = Page => {
  return props =>
    <div className="page">
      <CSSTransitionGroup
              key={location.key}
              timeout={{ enter: 1000, exit: 1000 }}
              classNames={'fade'}
            >
        <Page {...props} />
      </CSSTransitionGroup>
    </div>;
};

export default PageShell;