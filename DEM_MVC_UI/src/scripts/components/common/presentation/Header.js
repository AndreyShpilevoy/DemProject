import React from 'react';
import { Link, IndexLink } from 'react-router';

const Header = () => {
  return(
    <div className="container navbar-fixed-top">
      <div className="row margin-initial">
        <div className="col-xs-12 padding-initial">
          <nav id="header" className="navbar navbar-full navbar-height navbar-logo-bg padding-initial">
            <div className="row margin-initial heigth-inherit">
              <div className="flex-container col-xs-12 col-lg-6 padding-initial heigth-inherit">
                <div className="flex-element-1 flex-container-left flex-container-top-center">
                  <a className="navbar-brand navbar-brand-size" href="/">
                    <div className="navbar-logo"/>
                  </a>
                </div>
                <div className="flex-element-1 flex-container-right flex-container-top-center">
                  <button type="button" className="hidden-lg-up navbar-toggler" id="menu-toggle-button">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"/>
                    <span className="icon-bar"/>
                    <span className="icon-bar"/>
                  </button>
                </div>
              </div>
              <div className="col-xs-12 col-lg-6 padding-initial">

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
