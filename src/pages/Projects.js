import React from 'react';
import {
  Link, useLocation, useParams, useRouteMatch
} from 'react-router-dom';

import './pages.css';

function Projects({data}) {
  let location = useLocation();
  console.log('projects: ', location);

  let match = useRouteMatch({
    path: '/projects/:slug/',
    strict: true,
    sensitive: true
  });
  console.log('match:', match);

  return (
    <div id="projects" className="content">
      {Object.keys(data).map((result, index) => (
        <li key={data[result].id} className="inner-content">
          <Link to={`${match.path}/${data[result].slug}`}>
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
