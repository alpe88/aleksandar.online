import React, { Component } from 'react';

import './pages.css';

class About extends Component {

  render() {
    const { data } = this.props

    return (
        <div className="page">
          <div id="about" className="content">
            {Object.keys(data).map((result, index) => (
              <div key={data[result].id} className="inner-content">
                <h1><p>{data[result].title.rendered}</p></h1>
                <p dangerouslySetInnerHTML={{__html: data[result].content.rendered}}></p>
              </div>
            ))}
          </div>
        </div>
    )
  }
}

export default About
