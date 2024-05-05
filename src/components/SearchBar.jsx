import { useState } from "react";
import PropTypes from "prop-types";

import TextField from "@mui/material/TextField";

function SearchBar({ name, label, placeholder, width, setSelectedFilters }) {
  const [companyName, setCompanyName] = useState("");

  function handleChange(event) {
    setCompanyName(event.target.value);
    // if Searchbar is empty set value to null
    setSelectedFilters((prev) => {
      if (event.target.value?.length === 0) {
        const newFilters = { ...prev };
        delete newFilters[name];
        return newFilters;
      } else {
        return { ...prev, [name]: event.target.value.toLowerCase() };
      }
    });
  }

  return (
    <div className="searchBar">
      <label>{companyName.length > 0 ? label : ""}</label>
      <TextField
        sx={{
          minWidth: `${width}rem`,
          "& .MuiInputBase-input": { padding: "7.5px", fontSize: 14 },
        }}
        placeholder={placeholder}
        variant="outlined"
        onChange={handleChange}
      />
    </div>
  );
}

SearchBar.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  setSelectedFilters: PropTypes.func.isRequired,
};

export default SearchBar;
