import React, { Component } from 'react';
import { CSSTransition } from "react-transition-group";
import './pages.css';

class About extends Component {

  render() {
    const { location, data } = this.props

    return (
       <CSSTransition
              key={location.key}
              timeout={{ enter: 1000, exit: 1000 }}
              classNames={'fade'}
            >
        <div className="page">
          <div id="about" className="content">
            {Object.keys(data).map((result, index) => (
              <div key={data[result].id} className="inner-content">
                <img src={data[result].additional_fields.featured_image_src} alt={data[result].additional_fields.featured_image_alt} />
                <h1><p>{data[result].title.rendered}</p></h1>
                <p dangerouslySetInnerHTML={{__html: data[result].content.rendered}}></p>
              </div>
            ))}
          </div>
        </div>
       </CSSTransition>
    )
  }
}

export default About
