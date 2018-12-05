import React, { Component } from 'react';
import { CSSTransition } from "react-transition-group";
import './pages.css';

import Logo from '../logo/Logo';

class Home extends Component {

  render() {
    const { location } = this.props

    return (
      <CSSTransition
              key={location.key}
              timeout={{ enter: 1000, exit: 1000 }}
              classNames={'fade'}
            >
        <div className="page">
          <div id="home" className="content">
            <p>Hello!</p>
            <p>Welcome to</p>
            <Logo />
            <p>I am Aleksandar Petrovic, I make things on the web</p>
            <p>...sometimes..</p>
          </div>
        </div>
      </CSSTransition>
    )
  }
}

export default Home
