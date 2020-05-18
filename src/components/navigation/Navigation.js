import React, { useState, useEffect } from 'react';
import {
  NavLink
} from 'react-router-dom';

function Navigation({data}) {
console.log(data);
    return (
        <nav id="nav" className="nav"> 
            <ul>       
            { Object.keys(data).map((result, index) => (
                <li key={data[result].ID} className="nav link">
                     <NavLink to={data[result].title} activeClassName='active'>{data[result].title}</NavLink>    
                </li> 
            ))
            }
            </ul>
        </nav>
    )
  }
  
export default Navigation




