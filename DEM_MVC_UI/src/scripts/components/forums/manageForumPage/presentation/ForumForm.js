import React, { PropTypes } from "react";
import TextInput from "../../../common/TextInput";
import SelectInput from "../../../common/SelectInput";

const ForumForm = ({forum, allAuthors, onSave, onChange, loading, errors}) => {
  return (
      <form>
        <h1>Manage Forum</h1>
        <TextInput
          name="title"
          label="Title"
          value={forum.title}
          onChange={onChange}
          error={errors.title}/>

        <SelectInput
          name="authorId"
          label="Author"
          value={forum.authorId}
          defaultOption="Select Author"
          options={allAuthors}
          onChange={onChange}
          error={errors.authorId}/>

        <TextInput
          name="category"
          label="Category"
          value={forum.category}
          onChange={onChange}
          error={errors.category}/>

        <TextInput
          name="length"
          label="Length"
          value={forum.length}
          onChange={onChange}
          error={errors.length}/>

        <input
          type="submit"
          disabled={loading}
          value={loading ? "Saving..." : "Save"}
          className="btn btn-primary"
          onSave={onSave}/>
      </form>
  );
};

ForumForm.propTypes = {
  forum: PropTypes.object.isRequired,
  allAuthors: PropTypes.array,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  errors: PropTypes.object,
};

export default ForumForm;
