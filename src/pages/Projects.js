import React from 'react';
import {
  Link, useLocation
} from 'react-router-dom';

import './pages.css';

function Projects({data}) {
  let location = useLocation();
  console.log('location: ', location);

  return (
    <div id="projects" className="content">
      {Object.keys(data).map((result, index) => (
        <li key={data[result].id} className="inner-content">
          <Link to={`${location.pathname}/${data[result].slug}`}>
            <p>
              {index} -
              {data[result].title.rendered}
            </p>
          </Link>
        </li>
      ))}
    </div>
  )
}

export default Projects
