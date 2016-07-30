import React, { PropTypes } from "react";
import ForumListRow from "./ForumListRow";

const ForumList = ({forums}) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th>Title</th>
          <th>Author</th>
          <th>Category</th>
          <th>Length</th>
        </tr>
      </thead>
      <tbody>
        {forums.map(forum =>
          <ForumListRow key={forum.id} forum={forum}/>
        )}
      </tbody>
    </table>
  );
};

ForumList.propTypes = {
  forums: PropTypes.array.isRequired
};

export default ForumList;
