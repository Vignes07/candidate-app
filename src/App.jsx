import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState, Suspense, lazy } from "react";

import { fetchJobData } from "./reducers/jobReducer.js";
import { selectAllJobs, selectLoading } from "./selectors/selector.js";

import Filters from "./Filters.jsx";
import LoadMore from "./components/LoadMore.jsx";
// import JobListing from "./JobListing.jsx";

import { CircularProgress } from "@mui/material";

import "./App.css";

const JobListing = lazy(() => import("./JobListing"));

function App() {
  const dispatch = useDispatch();
  const data = useSelector(selectAllJobs);
  const loading = useSelector(selectLoading);

  const [filters, setFilters] = useState({});

  const limitRef = useRef(0);

  const [fetching, setFetching] = useState(false);

  const [jobListingLoaded, setJobListingLoaded] = useState(false);

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
                  return filterItem?.toString().includes(job[key]);
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

  // Throttling
  function throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  // Debouncing
  function debounce(func, delay) {
    let debounceTimer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  }

  function handleLoadMore() {
    limitRef.current += 9;
    setFetching(true);
    dispatch(
      fetchJobData({ limit: limitRef.current, offset: 0, filters: filters })
    );
  }

  const throttledHandleLoadMore = throttle(handleLoadMore, 1000);

  // Fetch Data on render
  // Fetch Data on filter change
  // useEffect(() => {
  //     limitRef.current = 9; // Reset limit
  //     dispatch(fetchJobData({limit: limitRef.current, filters: filters}));
  // }, [dispatch, filters]);

  useEffect(() => {
    if (filteredData.length < 9) {
      limitRef.current += 9; // Increase limit
      dispatch(fetchJobData({ limit: limitRef.current, filters: filters }));
    }
  }, [dispatch, filters, filteredData, data.length]);

  //Infinite Scroll
  useEffect(() => {
    const handleScroll = debounce(() => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (!fetching && scrollTop + clientHeight >= scrollHeight) {
        limitRef.current += 9;
        setFetching(true);
        dispatch(
          fetchJobData({ limit: limitRef.current, offset: 0, filters: filters })
        );
      }
    }, 500);

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
      <Suspense fallback={<CircularProgress />}>
        {data && (
          <JobListing
            data={filteredData}
            onLoaded={() => setJobListingLoaded(true)}
          />
        )}
      </Suspense>
      <br />
      {/* Only show the CircularProgress component when loading is true and jobListingLoaded is also true */}
      {loading && jobListingLoaded ? <CircularProgress /> : null}
      {/* Only show the LoadMore component when jobListingLoaded is true and loading is false */}
      {jobListingLoaded && !loading ? (
        <LoadMore loadMore={throttledHandleLoadMore} />
      ) : null}
    </div>
  );
}

export default App;
