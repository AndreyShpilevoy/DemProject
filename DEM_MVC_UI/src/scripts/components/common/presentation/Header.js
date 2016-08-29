import React from 'react';
import { Link, IndexLink } from 'react-router';

const Header = () => {
  return(
    <div className="container navbar-fixed-top">
      <div className="row">
        <div className="col-xs-12">
          <nav id="header" className="navbar navbar-full navbar-height navbar-logo-bg">
            <div className="col-xs-12 col-lg-6">
              //logo
            </div>
            <div className="col-xs-12 col-lg-6 padding-initial-xs-up">
              //links
            </div>
          </nav>
        </div>
      </div>
        <IndexLink to="/" activeClassName="active">ForumsPage</IndexLink>
        {" | "}
        <Link to="/topics" activeClassName="active">TopicsPage</Link>
    </div>
  );
};

export default Header;
