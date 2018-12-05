import React, { Component } from 'react';

import './pages.css';

import Logo from '../logo/Logo';

class Home extends Component {

  render() {
    return (
        <div className="page">
          <div id="home" className="content">
            <p>Hello!</p>
            <p>Welcome to</p>
            <Logo />
            <p>I am Aleksandar Petrovic, I make things on the web</p>
            <p>...sometimes..</p>
          </div>
        </div>
    )
  }
}

export default Home
