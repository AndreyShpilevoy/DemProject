import React, { PropTypes } from "react";
import { Link } from "react-router";

const ForumListRow = ({forum}) => {
  return (
    <tr>
      <td><a href={forum.watchHref} target="_blank">Watch</a></td>
      <td><Link to={"/forum/" + forum.id}>{forum.title}</Link></td>
      <td>{forum.authorId}</td>
      <td>{forum.category}</td>
      <td>{forum.length}</td>
    </tr>
  );
};

ForumListRow.propTypes = {
  forum: PropTypes.object.isRequired
};

export default ForumListRow;
