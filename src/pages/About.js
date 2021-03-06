import React from 'react';
import { useLocation } from 'react-router-dom';
import './pages.css';
import { baseStyles } from "../css/baseStyles";

function About({data}) {
  let location = useLocation();
  console.log('about: ',location);
  console.log('about: ',data);
  return (
    <div id="about" className="content">
      {Object.keys(data).map((result, index) => (
        <div key={data[result].id} className="inner-content">
          <img style={baseStyles.image} src={data[result].additional_fields.featured_image_src} alt={data[result].additional_fields.featured_image_alt} />
          <h1><p>{data[result].title.rendered}</p></h1>
          <p dangerouslySetInnerHTML={{__html: data[result].content.rendered}}></p>
        </div>
      ))}
    </div>
  )
}

export default About
