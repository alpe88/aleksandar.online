import React from 'react';
import {
  Link, useLocation, useParams, useRouteMatch
} from 'react-router-dom';
import './pages.css';

function Project({data}) {
  let { slug } = useParams();
  let location = useLocation();
  console.log('project: ',location);
  const project = data.find((p) => p.slug === slug)

    console.log(project)
    return (
      <div id="project" className="content">
        <img src={project.additional_fields.featured_image_src} alt={project.additional_fields.featured_image_alt} />
        <h1>{project.title.rendered}</h1>
        <p dangerouslySetInnerHTML={{__html: project.content.rendered}}></p>
        <p>role:</p> {project.additional_fields.role}
        <p>url:</p> {project.additional_fields.source_url}
        <p>technologies used:</p> {project.additional_fields.technologies_used}
      </div>
    )
  }

export default Project
