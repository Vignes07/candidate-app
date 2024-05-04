import "./App.css";
import Filters from "./Filters.jsx";
import JobListing from "./JobListing.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchJobData } from "./reducers/jobReducer.js";
import { selectAllJobs, selectLoading } from "./selectors/selector.js";
import { CircularProgress } from "@mui/material";

function App() {
  const dispatch = useDispatch();
  const data = useSelector(selectAllJobs);
  const loading = useSelector(selectLoading);

  const [filters, setFilters] = useState({});

  const filteredData =
    Object.keys(filters).length === 0
      ? data
      : data.filter((job) => {
          return Object.keys(filters).every((key) => {
            // If the job doesn't have the key, ignore the filter
            if (!Object.prototype.hasOwnProperty.call(job, key)) {
              return true;
            }
            // If filter[key] is an array
            if (Array.isArray(filters[key])) {
              return filters[key].some((filterItem) => {
                // If filterItem is an object
                if (
                  typeof filterItem === "object" &&
                  filterItem !== null &&
                  "role" in filterItem
                ) {
                  // If job[key] is an array, check if any role includes the filter item
                  if (Array.isArray(job[key])) {
                    return job[key].some((role) =>
                      filterItem.role.toLowerCase().includes(role)
                    );
                  } else {
                    return filterItem.role.toLowerCase().includes(job[key]);
                  }
                } else {
                  return filterItem && filterItem.toString().includes(job[key]);
                }
              });
            } else {
              if (typeof filters[key] === "number") {
                // If the key is salary value must be greater than or equal to filter
                if (key === "minJdSalary") {
                  return job[key] >= filters[key];
                }
                // If the key is experience value must be less than or equal to filter
                else {
                  return job[key] <= filters[key];
                }
              } else {
                return job[key]
                  ?.toString()
                  .toLowerCase()
                  .includes(filters[key]?.toString().toLowerCase());
              }
            }
          });
        });

  // Fetch Data on render
  useEffect(() => {
    dispatch(fetchJobData());
  }, [dispatch]);

  return (
    <div className={"container"}>
      <Filters onFiltersChange={setFilters} />
      {loading ? (
        <CircularProgress />
      ) : (
        data && <JobListing data={filteredData} />
      )}
    </div>
  );
}

export default App;
