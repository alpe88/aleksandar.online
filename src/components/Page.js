import React from 'react';
import { CSSTransition } from "react-transition-group";

import './pages.css';

const PageShell = Page => {
  return props =>
    <div className="page">
      <CSSTransition
              key={location.key}
              timeout={{ enter: 1000, exit: 1000 }}
              classNames={'fade'}
            >
        <Page {...props} />
      </CSSTransition>
    </div>;
};

export default PageShell;