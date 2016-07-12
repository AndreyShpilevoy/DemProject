import React from 'react';
import { Link } from 'react-router';

const TopicsPage  = () => {
  return(
    <div>
      <p>Test TopicsPage</p>
      <Link to="forums" className="btn">Forums</Link>
    </div>
  );
};

export default TopicsPage;
