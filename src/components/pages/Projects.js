import React, { Component } from 'react';

import {
  Link
} from 'react-router-dom';

import './pages.css';

class Projects extends Component {
  state = {
    data: []
  }

  componentDidMount() {
    let dataURL = "https://aleksandar.online/wp-json/wp/v2/projects?_embed"
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
    console.log(data);
    return (
        <div className="page">
          <div id="projects" className="content">
            {Object.keys(data).map((result, index) => (
              <li key={data[result].id} className="inner-content">
                <Link to={`/projects/${data[result].slug}`}>
                  <p>
                    {index} -
                    {data[result].title.rendered}
                  </p>
                </Link>
              </li>
            ))}
          </div>
        </div>
    );
  }
}

export default Projects;
