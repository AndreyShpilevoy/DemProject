import React from 'react';
import { Link } from 'react-router';

const ForumsPage = () => {
  return(
    <div>
      <p>Test ForumsPage</p>
      <Link to="topics" className="btn">Topics</Link>
    </div>
  );
};

export default ForumsPage;
