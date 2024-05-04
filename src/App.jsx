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

  useEffect(() => {
    dispatch(fetchJobData());
  }, [dispatch]);

  return (
    <div className={"container"}>
      <Filters onFiltersChange={setFilters} />
      {loading ? <CircularProgress /> : data && <JobListing data={data} />}
    </div>
  );
}

export default App;
