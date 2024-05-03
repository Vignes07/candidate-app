import { useState } from "react";
import PropTypes from "prop-types";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

function DropDown({ label, placeholder, width, options, multiple }) {
  const [selectedValues, setSelectedValues] = useState([]);

  return (
    <div className="dropdown" key={label}>
      {/* shows label when a value selected */}
      <label>
        {typeof selectedValues === "string" ||
        (Array.isArray(selectedValues) && selectedValues.length > 0)
          ? label
          : ""}
      </label>
      <Autocomplete
        multiple={multiple} // for multiple or single selection
        sx={{ width: "max-content", fontSize: 6 }}
        options={options}
        groupBy={(option) => {
          if (
            typeof option === "object" &&
            option !== null &&
            "title" in option
          ) {
            return option.title;
          }
          return null;
        }} // Checks if it is an object or array, if it is an object it returns object.value or it returns null
        getOptionLabel={(option) => {
          if (
            typeof option === "object" &&
            option !== null &&
            "role" in option
          ) {
            return option.role;
          }
          return option;
        }}
        onChange={(_event, newValue) => {
          setSelectedValues(newValue);
        }}
        renderInput={(params) => (
          <TextField
            sx={{
              minWidth: `${width}rem`,
              "& .MuiInputBase-root": { padding: "2px", fontSize: 14 },
            }}
            {...params}
            placeholder={
              selectedValues && selectedValues.length > 0 ? "" : placeholder
            }
          />
        )}
      />
    </div>
  );
}

DropDown.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  options: PropTypes.array.isRequired,
  multiple: PropTypes.bool.isRequired,
};

export default DropDown;
