import "./App.css";
import Filters from "./Filters.jsx";
import JobListing from "./JobListing.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchJobData } from "./reducers/jobReducer.js";
import { selectAllJobs, selectLoading } from "./selectors/selector.js";
import { CircularProgress } from "@mui/material";

function App() {
  const dispatch = useDispatch();
  const data = useSelector(selectAllJobs);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchJobData());
  }, [dispatch]);

  return (
    <div className={"container"}>
      <Filters />
      {loading ? <CircularProgress /> : data && <JobListing data={data} />}
    </div>
  );
}

export default App;
