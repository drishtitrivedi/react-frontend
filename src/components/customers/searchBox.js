import React from "react";

const SearchBox = ({ value, onChange }) => {
  return (
    <React.Fragment>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            <i class="fa fa-search" aria-hidden="true"></i>
          </span>
        </div>
        <input
          type="text"
          name="query"
          className="form-control"
          placeholder="Search Customer Name..."
          value={value}
          onChange={(e) => onChange(e.currentTarget.value)}
        />
      </div>
    </React.Fragment>
  );
};

export default SearchBox;
