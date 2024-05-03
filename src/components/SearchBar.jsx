import PropTypes from "prop-types";

import TextField from "@mui/material/TextField";
import { useState } from "react";

function SearchBar({ label, placeholder, width }) {
  const [companyName, setCompanyName] = useState("");

  return (
    <div className="searchBar">
      <label>{companyName.length > 0 ? label : ""}</label>
      <TextField
        sx={{
          minWidth: `${width}rem`,
          "& .MuiInputBase-input": { padding: "9.5px 5px", fontSize: 14 },
        }}
        placeholder={placeholder}
        variant="outlined"
        onChange={(event) => {
          setCompanyName(event.target.value);
        }}
      />
    </div>
  );
}

SearchBar.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

export default SearchBar;
