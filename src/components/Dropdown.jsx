import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

function DropDown({
  name,
  label,
  placeholder,
  width,
  options,
  multiple,
  setSelectedFilters,
}) {
  const [selectedValues, setSelectedValues] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]); // New state for filtered options

  useEffect(() => {
    if (Array.isArray(selectedValues)) {
      // Filtering the options that are not selected
      setFilteredOptions(
        options.filter((option) => {
          // if it is an object filter by role
          if (
            typeof option === "object" &&
            option !== null &&
            "role" in option
          ) {
            return !selectedValues
              .map((item) => item.role)
              .includes(option.role);
          } else {
            return !selectedValues.includes(option);
          }
        })
      );
    } else {
      setFilteredOptions(options);
    }
  }, [selectedValues, options]);

  function handleChange(event, newValue) {
    setSelectedValues(newValue);
    setSelectedFilters((prev) => {
      if (
        (Array.isArray(newValue) && newValue.length === 0) ||
        newValue === null
      ) {
        const newFilters = { ...prev };
        delete newFilters[name];
        return newFilters;
      } else {
        if (name === "minJdSalary" && typeof newValue === "string") {
          // Remove 'L' from the end of the string and convert to a number
          newValue = Number(newValue.slice(0, -1));
        }
        return { ...prev, [name]: newValue };
      }
    });
  }

  console.log(selectedValues);

  return (
    <div className="dropdown" key={label}>
      {/*Show label when an option is selected*/}
      <label>
        {typeof selectedValues === "string" ||
        typeof selectedValues === "number" ||
        (Array.isArray(selectedValues) && selectedValues.length > 0)
          ? label
          : ""}
      </label>
      <Autocomplete
        multiple={multiple}
        sx={{
          width: "max-content",
          fontSize: 6,
          "& .MuiChip-root": { fontSize: 12, height: 25 },
        }}
        options={filteredOptions}
        // Check if option is an object then will return title for label otherwise just returns empty string
        groupBy={(option) => {
          if (
            typeof option === "object" &&
            option !== null &&
            "title" in option
          ) {
            return option.title;
          }
          return null;
        }}
        // Check if option is an object then will return role otherwise just returns option
        getOptionLabel={(option) => {
          return option && typeof option === "object" && "role" in option
            ? option.role
            : option
            ? option.toString()
            : "";
        }}
        // Checks the equality between option and value
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            sx={{
              minWidth: `${width}rem`,
              "& .MuiInputBase-root": { paddingY: "0px", fontSize: 14 },
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
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  options: PropTypes.array.isRequired,
  multiple: PropTypes.bool.isRequired,
  setSelectedFilters: PropTypes.func.isRequired,
};

export default DropDown;
