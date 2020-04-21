import React from 'react';
import {useLocation
} from 'react-router-dom';
import Logo from '../components/logo/Logo';
import './pages.css';

function Home() {
  let location = useLocation();
  console.log('home: ',location);
  return (
    <div id="home" className="content">
      <p>Hello!</p>
      <p>Welcome to</p>
      <Logo />
      <p>I am Aleksandar Petrovic, I make things on the web</p>
      <p>...sometimes..</p>
    </div>
  )
}

export default Home
