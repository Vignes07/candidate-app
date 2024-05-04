import PropTypes from "prop-types";

import Job from "./components/Job.jsx";

function JobListing({ data }) {
  return (
    <div className={"job-listing"}>
      {data.map((job, i) => (
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
      ))}
    </div>
  );
}

JobListing.propTypes = {
  data: PropTypes.array.isRequired,
};

export default JobListing;
