import React from 'react';
import { Link, IndexLink } from 'react-router';

const Header = () => {
  return(
    <div className="container navbar-fixed-top">
      <div className="row margin-initial">
        <div className="col-xs-12 padding-initial">
          <nav id="header" className="navbar navbar-full navbar-height navbar-logo-bg padding-initial">
            <div className="row margin-initial">
              <div className="col-xs-12 col-lg-6 padding-initial">
                <a className="navbar-brand navbar-brand-size" href="#">
                  <div className="navbar-logo"/>
                </a>
                // <button type="button" className="navbar-toggler hidden-lg-up pull-xs-right" id="menu-toggle-button">
								// 	<span className="sr-only">Toggle navigation</span>
								// 	<span className="icon-bar"/>
								// 	<span className="icon-bar"/>
								// 	<span className="icon-bar"/>
								// </button>
              </div>
              <div className="col-xs-12 col-lg-6 padding-initial">
                //links
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

// <IndexLink to="/" activeClassName="active">ForumsPage</IndexLink>
// {" | "}
// <Link to="/topics" activeClassName="active">TopicsPage</Link>

export default Header;
