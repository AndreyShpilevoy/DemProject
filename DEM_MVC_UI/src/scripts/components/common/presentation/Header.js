import React from 'react';
import { Link, IndexLink } from 'react-router';

const Header = () => {
  return(
    <div className="container navbar-fixed-top">
      <div className="row">
        <div className="col-xs-12">
          <nav>
            <IndexLink to="/" activeClassName="active">ForumsPage</IndexLink>
            {" | "}
            <Link to="/topics" activeClassName="active">TopicsPage</Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
