import React, { Component } from 'react';

import './pages.css';

class About extends Component {
  state = {
    data: []
  }

  componentDidMount() {
    let dataURL = "https://blahblahblah/wp-json/wp/v2/pages?filter[name]=about?_embed";
    fetch(dataURL)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res,
        })
      })
  }

  render() {
    const { data } = this.state
    console.log(data)
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
    );
  }
}

export default About;
