import "./App.css";
import Filters from "./Filters.jsx";
import JobListing from "./JobListing.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { fetchJobData } from "./reducers/jobReducer.js";
import { selectAllJobs, selectLoading } from "./selectors/selector.js";
import { CircularProgress } from "@mui/material";
import LoadMore from "./components/loadMore.jsx";

function App() {
  const dispatch = useDispatch();
  const data = useSelector(selectAllJobs);
  const loading = useSelector(selectLoading);

  const [filters, setFilters] = useState({});

  const limitRef = useRef(9);

  const [fetching, setFetching] = useState(false);

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
                // value must be greater than or equal to filter
                return job[key] >= filters[key];
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
  // Fetch Data on filter change
  useEffect(() => {
    limitRef.current = 9; // Reset limit
    dispatch(fetchJobData({ limit: limitRef.current, filters: filters }));
  }, [dispatch, filters]);

  function handleLoadMOre() {
    limitRef.current += 9;
    setFetching(true);
    dispatch(
      fetchJobData({ limit: limitRef.current, offset: 0, filters: filters })
    );
  }

  //Infinite Scroll
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (!fetching && scrollTop + clientHeight >= scrollHeight) {
        limitRef.current += 9;
        setFetching(true);
        dispatch(
          fetchJobData({ limit: limitRef.current, offset: 0, filters: filters })
        );
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch, fetching, filters]);

  useEffect(() => {
    if (!loading) {
      setFetching(false);
    }
  }, [loading]);

  return (
    <div className={"container"}>
      <Filters onFiltersChange={setFilters} />
      {data && <JobListing data={filteredData} />}
      <br />
      {loading ? <CircularProgress /> : <LoadMore loadMore={handleLoadMOre} />}
    </div>
  );
}

export default App;
