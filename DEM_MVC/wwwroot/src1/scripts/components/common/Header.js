import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';

const Header = () => {
  return(
    <nav>
      <IndexLink to="/" activeClassName="active">ForumsPage</IndexLink>
      {" | "}
      <Link to="topics" activeClassName="active">TopicsPage</Link>
    </nav>
  );
};

export default Header;
