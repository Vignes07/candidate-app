import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";

import Job from "./components/Job.jsx";

// used React.memo to prevent unnecessary renders on prop changes
const JobListing = React.memo(({ data, onLoaded }) => {
  // used useCallback for memoization to prevent unnecessary renders
  const renderJob = useCallback(
    (job) => (
      <Job
        key={job.jdUid}
        companyName={job.companyName}
        logoUrl={job.logoUrl}
        jobRole={job.jobRole}
        location={job.location}
        minJdSalary={job.minJdSalary}
        maxJdSalary={job.maxJdSalary}
        jobDetailsFromCompany={job.jobDetailsFromCompany}
        minExp={job.minExp}
      />
    ),
    []
  );

  // Call onLoaded when the component is rendered for the first time
  useEffect(() => {
    onLoaded();
  }, [onLoaded]);

  return <div className={"job-listing"}>{data.map(renderJob)}</div>;
});

JobListing.propTypes = {
  data: PropTypes.array.isRequired,
  onLoaded: PropTypes.func.isRequired,
};

JobListing.displayName = "JobListing";

export default JobListing;
