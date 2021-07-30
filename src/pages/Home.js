import React from 'react';
import {
  useLocation, Link
} from 'react-router-dom';
import { baseStyles } from "../css/baseStyles";
import './pages.css';

import NavigationHomepage from '../components/navigation/NavigationHomepage'

function Home({data}) {
  let location = useLocation();
  console.log('data on homepage: ',data.menus.main);
  return (
    <div id="home" className="content">
      <div className="container-fluid">
        <div className="row-fluid">
          <Link style={baseStyles.uppercase} to="/">a.o</Link>
          <NavigationHomepage data={data.menus.main} />
        </div>
      </div>
    </div>
  )
}

export default Home
